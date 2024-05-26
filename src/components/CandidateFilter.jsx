"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import queryString from "query-string";
import { useRouter } from "next/navigation";

const CandidateFilter = ({ filterMenus }) => {
  const router = useRouter();
  const [filterMenusClone, setFilterMenusClone] = useState(null);
  const handleCheckedChange = (checked, i, j) => {
    const clone = [...filterMenusClone];
    clone[i].options[j].checked = checked;
    setFilterMenusClone(clone);
    sessionStorage.setItem("filterMenus", JSON.stringify(clone));
  };
  useEffect(() => {
    const sessionFilterMenus = JSON.parse(
      sessionStorage.getItem("filterMenus")
    );
    if (sessionFilterMenus) setFilterMenusClone(sessionFilterMenus);
    else setFilterMenusClone(filterMenus);
  }, [filterMenus]);

  useEffect(() => {
    if (filterMenusClone) {
      const selectedOptions = {};
      filterMenusClone.forEach((item) => {
        item.options.forEach((option) => {
          if (option.checked === true) {
            if (!selectedOptions[item.id]) {
              selectedOptions[item.id] = [];
            }
            selectedOptions[item.id].push(option.label);
          }
        });
      });

      const urlParams = queryString.stringify(selectedOptions, {
        arrayFormat: "comma",
      });
      const url = queryString.stringifyUrl(
        {
          url: window.location.pathname,
          query: urlParams
            ? {
                ...selectedOptions,
              }
            : null,
        },
        {
          skipNull: true,
          arrayFormat: "comma",
        }
      );
      router.push(url);
    }
  }, [filterMenusClone]);

  return (
    <Menubar>
      {filterMenusClone?.map((item, i) => (
        <MenubarMenu key={i}>
          <MenubarTrigger>{item.name}</MenubarTrigger>
          <MenubarContent>
            {item.options.map((option, j) => (
              <MenubarItem key={j}>
                <Checkbox
                  checked={option.checked}
                  className="mr-2"
                  onCheckedChange={(checked) =>
                    handleCheckedChange(checked, i, j)
                  }
                />
                {option.label}
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
};

export default CandidateFilter;

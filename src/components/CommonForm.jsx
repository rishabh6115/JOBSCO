"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function CommonForm({
  action,
  formControls,
  buttonText,
  isBtnDisabled,
  btnType,
  formData,
  setFormData,
  handleFileChange,
}) {
  function renderInputByComponentType(getCurrentControl) {
    let content = null;

    switch (getCurrentControl.componentType) {
      case "input":
        content = (
          <div className="relative flex items-center mt-5">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full rounded-md h-[50px] px-4 border dark:bg-black bg-gray-100 text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        );

        break;

      case "file":
        content = (
          <Label
            // for={getCurrentControl.name}
            className="flex bg-gray-100 dark:bg-black items-center px-3 py-2 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
          >
            <h2>{getCurrentControl.label}</h2>
            <Input
              onChange={handleFileChange}
              id={getCurrentControl.name}
              type="file"
            />
          </Label>
        );

        break;

      default:
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full dark:bg-black rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        );
        break;
    }

    return content;
  }

  return (
    <form action={action}>
      {formControls.map((item, i) => (
        <span key={i}>{renderInputByComponentType(item)}</span>
      ))}
      <div className="mt-6 w-full">
        <Button
          disabled={isBtnDisabled}
          type={btnType || "submit"}
          className="disabled:opacity-50 flex h-11 items-center justify-center px-5"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}

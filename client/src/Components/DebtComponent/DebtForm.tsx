import { useDispatch } from "react-redux";
import { debtSliceActions } from "../../Model/debtSlice";
import FormInput from "../../Utils/Others/FormInput";
import formInputAnn from "../../Utils/TypeAnnotations/formInputAnn";
import { useState } from "react";
const DebtForm = ({onSubmit, isUpdate =false}:{onSubmit:(e:any)=>void, isUpdate?:boolean}) => {
  const [formNumber, setFormNumber] = useState(1);
  const { updateDebtCreate } = debtSliceActions;
  const dispatch = useDispatch();
  function onChange(name: string, value: string, nameContainer?: string) {
    const newValue =
      name === "paid" ? (value === "true" ? true : false) : value;

    const payload = nameContainer
      ? { name, value: newValue, nameContainer }
      : { name, value:newValue };
    dispatch(updateDebtCreate(payload));
  }
  const sectionOne: formInputAnn[] = [
    {
      name: "title",
      label: "title",
      type: "text",
      inputClass: "debt-input-holder",
      onChange,
      stateNames: { name: "debtCreate", slice: "debtSlice" },
      showLabel: true,
    },
    {
      name: "amount",
      label: "amount",
      type: "number",
      inputClass: "debt-input-holder",
      onChange,
      stateNames: { name: "debtCreate", slice: "debtSlice" },
      showLabel: true,
    },
    {
      name: "incuredDate",
      label: "incuredDate",
      type: "date",
      inputClass: "debt-input-holder",
      onChange,
      stateNames: { name: "debtCreate", slice: "debtSlice" },
      showLabel: true,
    },
    {
      name: "deadline",
      label: "deadline",
      type: "date",
      inputClass: "debt-input-holder",
      onChange,
      stateNames: { name: "debtCreate", slice: "debtSlice" },
      showLabel: true,
    },
    {
      name: "paid",
      label: "paid",
      type: "select",
      inputClass: "debt-input-holder",
      selectOptions: ["true", "false"],
      onChange,
      stateNames: { name: "debtCreate", slice: "debtSlice" },
      showLabel: true,
    },
    {
      name: "debtInfo",
      label: "debt info",
      type: "text",
      inputClass: "debt-input-holder",
      onChange,
      stateNames: { name: "debtCreate", slice: "debtSlice" },
      showLabel: true,
    },
    {
      name: "category",
      label: "category",
      type: "select",
      inputClass: "debt-input-holder",
      onChange,
      selectOptions: ["to_be_collected", "to_be_paid"],
      stateNames: { name: "debtCreate", slice: "debtSlice" },
      showLabel: true,
    },
  ];
  const debtorInfoArr: formInputAnn[] = [
    {
      name: "name",
      label: "name",
      type: "text",
      inputClass: "debt-input-holder",
      onChange,
      stateNames: {
        name: "debtCreate",
        slice: "debtSlice",
        nameContainer: "debtorInfo",
      },
      showLabel: true,
    },
    {
      name: "location",
      label: "location",
      type: "text",
      inputClass: "debt-input-holder",
      onChange,
      stateNames: {
        name: "debtCreate",
        slice: "debtSlice",
        nameContainer: "debtorInfo",
      },
      showLabel: true,
    },
    {
      name: "contact",
      label: "contact",
      type: "number",
      inputClass: "debt-input-holder",
      onChange,
      stateNames: {
        name: "debtCreate",
        slice: "debtSlice",
        nameContainer: "debtorInfo",
      },
      showLabel: true,
    },
  ];
  const creditorInfoArr: formInputAnn[] = [
    {
      name: "name",
      label: "name",
      type: "text",
      inputClass: "debt-input-holder",
      onChange,
      stateNames: {
        name: "debtCreate",
        slice: "debtSlice",
        nameContainer: "creditorInfo",
      },
      showLabel: true,
    },
    {
      name: "location",
      label: "location",
      type: "text",
      inputClass: "debt-input-holder",
      onChange,
      stateNames: {
        name: "debtCreate",
        slice: "debtSlice",
        nameContainer: "creditorInfo",
      },
      showLabel: true,
    },
    {
      name: "contact",
      label: "contact",
      type: "number",
      inputClass: "debt-input-holder",
      onChange,
      stateNames: {
        name: "debtCreate",
        slice: "debtSlice",
        nameContainer: "creditorInfo",
      },
      showLabel: true,
    },
  ];
  return (
    <form className="debt-form-component" onSubmit={onSubmit}>
      {/* section one */}
      {formNumber === 1 && (
        <section className="debt-form part-one">
          <h4>Basic Information</h4>
          {sectionOne.map((elem: formInputAnn, index: number) => (
            <FormInput {...elem} key={index} />
          ))}
        </section>
      )}
      {/* section two */}
      {formNumber === 2 && (
        <section className="debt-form part-two">
          <h4>Creditor Information</h4>
          {creditorInfoArr.map((elem: formInputAnn, index: number) => (
            <FormInput {...elem} key={index} />
          ))}
          <h4>Debtor Information</h4>
          {debtorInfoArr.map((elem: formInputAnn, index: number) => (
            <FormInput {...elem} key={index} />
          ))}
        </section>
      )}
      {/* control btn */}
      <section className="debt-form-control">
        {formNumber === 2 ? (
          <>
            <button
              type="button"
              onClick={() => {
                setFormNumber(1);
              }}
            >
              previous
            </button>
            <button type="submit" onClick={onSubmit}> {!isUpdate ? "Create":"Update"} </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              setFormNumber(2);
            }}
          >
            next
          </button>
        )}
      </section>
    </form>
  );
};

export default DebtForm;

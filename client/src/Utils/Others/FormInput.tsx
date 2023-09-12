import { useSelector } from "react-redux";
import formInputAnn from "../../Utils/TypeAnnotations/formInputAnn";
const FormInput = ({
  type,
  onChange,
  name,
  label,
  stateNames,
  Icon,
  inputClass,
  iconClass,
  selectOptions,
  showLabel = false,
  isTextArea
}: formInputAnn) => {
  const { name: stateName, slice, nameContainer } = stateNames;
  const value = useSelector((state: any) =>
    nameContainer
      ? state[slice][stateName][nameContainer][name]
      : state[slice][stateName][name]
  );
  if (type === "select") {
    return (
      <div className={inputClass}>
        {showLabel && <label htmlFor={name}> {label} </label>}
        <select
          id={name}
          onChange={(e) => {
            if (nameContainer) {
              onChange(name, e.target.value, nameContainer);
            } else {
              onChange(name, e.target.value);
            }
          }}
          name={name}
          title={name}
          value={value}
        >
          {selectOptions?.map((elem: string, i: number) => (
            <option key={i} value={elem}>
              {" "}
              {elem}{" "}
            </option>
          ))}
        </select>
        {Icon && <Icon className={iconClass} />}
      </div>
    );
  }
  return (
    <div className={inputClass}>
      {showLabel && <label htmlFor={name}> {label} </label>}
      {isTextArea ? (
        <textarea
          id={name}
          autoComplete="true"
          placeholder={`${label} ...`}
          onChange={(e) => {
            if (nameContainer) {
              onChange(name, e.target.value, nameContainer);
            } else {
              onChange(name, e.target.value);
            }
          }}
          name={name}
          value={value}
          title={label}
        />
      ) : (
        <input
          id={name}
          autoComplete="true"
          placeholder={`${label} ...`}
          type={type}
          onChange={(e) => {
            if (nameContainer) {
              onChange(name, e.target.value, nameContainer);
            } else {
              onChange(name, e.target.value);
            }
          }}
          name={name}
          value={value}
          title={label}
        />
      )}
      {Icon && <Icon className={iconClass} />}
    </div>
  );
};

export default FormInput;

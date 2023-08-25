import { useSelector } from "react-redux";

type inputType = {
  name: string;
  type: string;
  onChange: (name: string, value: string) => void;
  label: string;
  stateNames: { slice: string; name: string };
  inputClass: string;
  Icon?: any;
  iconClass?: string;
};
const FormInput = ({
  type,
  onChange,
  name,
  label,
  stateNames,
  Icon,
  inputClass,
  iconClass,
}: inputType) => {
  const value = useSelector(
    (state: any) => state[stateNames.slice][stateNames.name][name]
  );
  if (type === "select") {
    return (
      <div className={inputClass}>
        <select
          onChange={(e) => {
            onChange(name, e.target.value);
          }}
          name={name}
          title="gender"
          value={value}
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        {Icon && <Icon className={iconClass} />}
      </div>
    );
  }
  return (
    <div className={inputClass}>
      <input
        placeholder={`your ${label} ...`}
        type={type}
        onChange={(e) => {
          onChange(name, e.target.value);
        }}
        name={name}
        value={value}
        title={label}
      />
      {Icon && <Icon className={iconClass} />}
    </div>
  );
};

export default FormInput;

import { useSelector } from "react-redux";

type inputType = {
  name: string;
  type: string;
  onChange: (name: string, value: string) => void;
  label: string;
  stateNames: { slice: string; name: string };
  Icon?: any;
};
const FormInput = ({
  type,
  onChange,
  name,
  label,
  stateNames,
  Icon,
}: inputType) => {
  const value = useSelector(
    (state: any) => state[stateNames.slice][stateNames.name][name]
  );
  if (type === "select") {
    return (
      <div className="form-input">
        <select
          onChange={(e) => {
            onChange(name, e.target.value);
          }}
          name={name}
          title="gender"
          value={value}
        >
          <option value="male" selected>
            male
          </option>
          <option value="female">female</option>
        </select>
        {Icon && <Icon className="form-input-icon"/>}
      </div>
    );
  }
  return (
    <div className="form-input">
      <input
        autoComplete="true"
        placeholder={`your ${label} ...`}
        type={type}
        onChange={(e) => {
          onChange(name, e.target.value);
        }}
        name={name}
        value={value}
        title={label}
      />
      {Icon && <Icon className="form-input-icon" />}
    </div>
  );
};

export default FormInput;

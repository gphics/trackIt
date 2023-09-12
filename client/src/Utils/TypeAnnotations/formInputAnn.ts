type inputType = {
        name: string;
        type: string;
        onChange: (name: string, value: string, nameContainer?: string) => void;
        label: string;
        stateNames: { slice: string; name: string, nameContainer?: string };
        inputClass: string;
        Icon?: any;
        iconClass?: string;
        selectOptions?: any[];
        showLabel?: boolean,
        isTextArea?:boolean,
};

export default inputType
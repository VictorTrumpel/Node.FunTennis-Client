import { Typeahead } from "react-bootstrap-typeahead";
import { useCallback } from "react";
import { InputSelectOption } from "@components/ui/form/InputSelect";
import { ModelInput, ModelInputProps } from "@components/ui/form/ModelInput";

export type ModelInputAutocompleteProps = ModelInputProps & {
  name: string;
  options: InputSelectOption[];
  handleSelect: (checkedOptions: InputSelectOption[]) => void;
};

export const ModelInputAutocomplete = ({
  name,
  options,
  handleSelect,
  ...props
}: ModelInputAutocompleteProps) => {
  const onChange = useCallback((checkedOptions: InputSelectOption[]) => {
    handleSelect(checkedOptions);
  }, []);

  return (
    <Typeahead
      className="input-autocomplete"
      renderInput={({ onChange }) => (
        <ModelInput
          type="text"
          placeholder="Выберите ученика"
          onChange={onChange}
          {...props}
        />
      )}
      id={`${name}-autocomplete-search`}
      options={options}
      onChange={(users) => onChange(users as InputSelectOption[])}
    />
  );
};

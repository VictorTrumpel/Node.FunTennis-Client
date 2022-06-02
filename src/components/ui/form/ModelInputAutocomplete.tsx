import classNames from "classnames";
import { Typeahead } from "react-bootstrap-typeahead";
import { FloatingLabel } from "react-bootstrap";
import { useCallback, useRef, useState } from "react";
import { InputSelectOption } from "@components/ui/form/InputSelect";

type TypeaheadRef = {
  inputNode: { value: string };
};

type ModelInputAutocompleteProps = {
  name: string;
  label: string;
  options: InputSelectOption[];
  handleSelect: (checkedOptions: InputSelectOption[]) => void;
};

export const ModelInputAutocomplete = ({
  name,
  label,
  options,
  handleSelect,
}: ModelInputAutocompleteProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);

  const onChange = useCallback((checkedOptions: InputSelectOption[]) => {
    handleSelect(checkedOptions);
  }, []);

  const onBlur = useCallback(() => {
    if (inputRef) {
      const value = (inputRef.current as unknown as TypeaheadRef)?.inputNode
        ?.value;
      if (value) return;
      setIsFocused(false);
      return;
    }
    setIsFocused(false);
  }, []);

  return (
    <FloatingLabel
      label={label}
      className={classNames("input-autocomplete_label", {
        focused: isFocused,
      })}
    >
      <Typeahead
        ref={inputRef}
        className="input-autocomplete"
        id={`${name}-autocomplete-search`}
        options={options}
        onFocus={() => setIsFocused(true)}
        onBlur={onBlur}
        onChange={(users) => onChange(users as InputSelectOption[])}
      />
    </FloatingLabel>
  );
};

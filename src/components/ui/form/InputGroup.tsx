import {
  InputGroup as BaseInputGroup,
  FormControl,
  InputGroupProps as BaseInputGroupProps,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useFormInput } from "@hooks/useFormInput";
import { Visible } from "@components/ui/Visible";

type InputGroupProps = Omit<BaseInputGroupProps, "onChange"> & {
  name: string;
  startText?: string;
  endText?: string;
};

export const InputGroup = observer(
  ({ name, startText, endText, ...props }: InputGroupProps) => {
    const { value, handleChange } = useFormInput<string>(name);

    return (
      <BaseInputGroup {...props}>
        <Visible condition={!!startText}>
          <BaseInputGroup.Text>{startText}</BaseInputGroup.Text>
        </Visible>
        <FormControl value={value} onChange={handleChange} />
        <Visible condition={!!endText}>
          <BaseInputGroup.Text>{endText}</BaseInputGroup.Text>
        </Visible>
      </BaseInputGroup>
    );
  }
);

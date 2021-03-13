import * as React from 'react';
import {FormControl, FormErrorMessage, FormLabel} from '@chakra-ui/form-control';
import {useField} from 'formik';
import {Input} from '@chakra-ui/input';
import {InputHTMLAttributes} from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  label: string;
};

export const InputField: React.FC<InputFieldProps> = ({label, size: _, ...props}) => {
  const [field, { error }] = useField(props);
    return (
      <div>
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Input
            {...field}
            {...props}
            id={field.name}
            placeholder={props.placeholder}
          />
          {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
      </div>
    );
};
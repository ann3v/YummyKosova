import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { TextField } from '@/src/components/TextField';

type FormTextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  textContentType?:
    | 'none'
    | 'name'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'emailAddress';
};

export function FormTextField<TFieldValues extends FieldValues>({
  control,
  name,
  ...props
}: FormTextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...props}
          value={typeof field.value === 'string' ? field.value : ''}
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const schema = Joi.object({
  name: Joi.string().required(),
  memberTypeID: Joi.number().required(),
});

export function useMemberForm(onLoad?: () => Promise<Master.MemberForm>) {
  const {
    control,
    handleSubmit,
    formState,
    register,
    reset,
  } = useForm<Master.MemberForm>({
    defaultValues: onLoad,
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    if (!onLoad) return;

    onLoad().then(data => {
      reset({
        name: data.name,
        memberTypeID: data.memberTypeID,
      });
    });
  }, [onLoad, reset]);

  return {
    get: (name: keyof Master.MemberForm) => ({ control, name }),
    register, 
    submitting: formState.isSubmitting,
    errors: formState.errors,
    handleSubmit,
  };
}
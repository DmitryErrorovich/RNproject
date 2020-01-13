import {
  FormikValues,
  withFormik as oWithFormik,
  WithFormikConfig,
} from 'formik';

export const withFormik = <
  OuterProps,
  Values extends FormikValues,
  Payload = Values
>(
  config: WithFormikConfig<OuterProps, Values, Payload>,
) => <T>(component: T) => oWithFormik(config)(component) as T;

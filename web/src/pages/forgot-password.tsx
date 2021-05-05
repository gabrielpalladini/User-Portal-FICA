import React from 'react';
import {Form, Formik} from 'formik';
import {toErrorMap} from '../utils/toErrorMap';
import {InputField} from '../components/InputField';
import {Box, Button, Flex, Link} from '@chakra-ui/react';
import NextLink from 'next/link';
import {Wrapper} from '../components/Wrapper';
import {createUrqlClient} from '../utils/createUrqlClient';
import {withUrqlClient} from 'next-urql';
import {router} from 'next/client';
import login from './login';

const ForgotPassword: React.FC<{}> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{usernameOrEmail: "", password: ""}}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            //worked
            router.push('/')
          }
        }}
      >
        {({isSubmitting}) => (
          <Form>
              <InputField
                name='email'
                placeholder='email'
                label='Email'
                type='email'
              />
            <Button
              mt={4}
              type='submit'
              colorScheme={'green'}
              isLoading={isSubmitting}
            >
              Forgot Password
            </Button>
          </Form>
        )}

      </Formik>
    </Wrapper>
  )
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
import React, {useState} from 'react';
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
import {useForgotPasswordMutation} from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{email: ""}}
        onSubmit={async (values) => {
          await forgotPassword(values)
          setComplete(true);
          }}
      >
        {({isSubmitting}) =>
          complete ? (
            <Box ft="black">
              if an account with that email exists, we can send you an email
            </Box>) : (
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
import * as React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import {Container, Text} from '@chakra-ui/layout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons'

const Login: React.FC<{}> = () => {
  const router = useRouter();
  const [,login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Container centerContent backgroundColor={'#333132'} paddingTop={'150px'} align="center">
        <Text
          fontSize="20px"
          fontWeight={'800'}
          color={'white'}
          width={'200px'}
          align={'center'}
          pb={'25px'}
        >
          Olá, colaborador!
        </Text>
        <FontAwesomeIcon size={"10x"} icon={faUsers} color={'#71BF45'} />
        <Formik
          initialValues={{username: "", password: ""}}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({options: values});
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              //worked
              router.push('/')
            }
          }}
        >
          {({isSubmitting}) => (
            <Form >
              <InputField
                name='username'
                placeholder='username'
                label=''
                width={'300px'}
                marginTop={'40px'}
              />
              <Box mt={4} paddingBottom={'20px'}>
                <InputField
                  name='password'
                  placeholder='password'
                  label=''
                  type='password'
                />
              </Box>
              <Button
                mt={4}
                type='submit'
                backgroundColor={'#71BF45'}
                color={'white'}
                width={'150px'}
                isLoading={isSubmitting}
                marginBottom={'200px'}
              >
                entrar
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Wrapper>
  );
};

export default Login;
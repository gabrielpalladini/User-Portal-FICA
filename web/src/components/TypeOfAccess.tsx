import React from 'react';
import {Box, Container, Flex, Link, Stack, Text} from '@chakra-ui/layout';
import NextLink from 'next/link';
import {useLogoutMutation, useMeQuery} from '../generated/graphql';
import {Button} from '@chakra-ui/button';

interface NavBarProps {
}

export const TypeOfAccess: React.FC<NavBarProps> = ({}) => {

  return (
    <Flex p={4} pb={'50px'}>
      <Stack spacing={4} direction="column" align="center">
        <Text fontSize="20px" fontWeight={'800'} color={'white'} width={'200px'} align={'center'}>Selecione o tipo de acesso</Text>
        <NextLink href="/login-moradora">
              <Button
              variant="link"
              backgroundColor={'white'}
              color={'green'}
              height={'40px'}
              width={'200px'}
            > Moradora </Button>
          </NextLink>
          <NextLink href="/login-colaborador">
            <Button
            variant="link"
            backgroundColor={'white'}
            color={'green'}
            height={'40px'}
            width={'200px'}
          >
              Colaborador FICA </Button>
          </NextLink>
      </Stack>
    </Flex>
  );
};

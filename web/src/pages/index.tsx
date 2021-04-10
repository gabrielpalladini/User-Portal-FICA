import React from 'react'
import {NavBar} from '../components/NavBar';
import {createUrqlClient} from '../utils/createUrqlClient';
import {withUrqlClient} from 'next-urql';
import {usePostsQuery} from '../generated/graphql';
import {TypeOfAccess} from '../components/TypeOfAccess';
import {Container, Heading, Text, Divider} from '@chakra-ui/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import {Center} from '@chakra-ui/react';

const Index = () => {
  const [{data}] = usePostsQuery();
  return (
    <>
      <Container centerContent backgroundColor={'green'} paddingTop="20" >
        <Heading color='white' size="4xl">FICA</Heading>
        <Divider size={'s'}/>
        <FontAwesomeIcon size={"10x"} icon={faHome} />
        <Text fontSize="4xl" fontWeight={'800'} >manual  da <br/> moradora</Text>
        <Divider />
        <TypeOfAccess/>
        <br/>
        {!data ? (
          <div>loading...</div>
        ) : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
        <NavBar/>
      </Container>
    </>
  );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);

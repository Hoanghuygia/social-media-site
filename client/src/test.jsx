import { Button, Center, HStack, Tab } from '@chakra-ui/react';
import {Box, Image} from 'chakra-ui/React';

function test() {
    return (
        <Center bg='gray.100' h='100vh'>
            <Box maxW='420px' bg='white' p='6'>
                <Image
                    src=''
                    slt=''
                    borderRadius='xl'
                    obhectFit='cover'
                    mx='auto'
                />
                <HStack mt='5' spacing='3'>
                    {['Waterfall', 'Nature'].map(item =>{
                        <Tab key={item} variant='outline'>
                            {item}
                        </Tab>
                    })}
                </HStack>

                <Heading my='4' size='lg'>
                    ABC
                </Heading>

                <Text>
                    fdadfsjdjkdka
                </Text>

                <Center my='6'>
                    <Button colorScheme='blue'>
                        Learn more
                    </Button>
                </Center>
            </Box>
        </Center>
      );
}

export default test;


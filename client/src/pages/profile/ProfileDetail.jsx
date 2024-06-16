import {
    Center,
    Flex,
    Box,
    Avatar,
    Heading,
    Text,
    Icon,
    Input,
    Textarea,
    Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiUserCircle, HiCake, HiDotsHorizontal } from "react-icons/hi";
import { Link as ReactRouterLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function ProfileDetail() {
    const [sidebarHeight, setSidebarHeight] = useState(0);

    useEffect(() => {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const windowHeight = window.innerHeight;
        const sidebarHeight = windowHeight - headerHeight;
        setSidebarHeight(sidebarHeight);
    }, []);

    const [firstName, setFirstName] = useState('Swirl');
    const [lastName, setLastName] = useState('Lolipop');
    const [email, setEmail] = useState('dhaowinaowinodoana@gmail.com');
    const [phoneNumber, setPhoneNumber] = useState('+84783279012');
    const [address, setAddress] = useState('Thu Duc city, HCM city');
    const [introduction, setIntroduction] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/profile')
    }

    return (
        <Center bg="bg-color.100" h={`${sidebarHeight}px`} className="font-inter">
            <Flex w="75%" flexDir="row" gap={12}>
                <Box flex={1} className="leftCol">
                    <Flex flexDir="column" textAlign="center" gap={3}>
                        <Center>
                            <Avatar
                                size="xl"
                                name="profile"
                                src={"/img/avatar.png"}
                            />
                        </Center>
                        <Heading as="h2" fontSize="2xl">
                            Swirl Lollipop
                        </Heading>

                        <Box textAlign="left">
                            <Heading
                                as="h2"
                                fontSize="xl"
                                fontWeight="semibold"
                                color="RGBA(0, 0, 0, 0.4)"
                            >
                                Bios:   
                            </Heading>
                            <Textarea
                                borderRadius="xl"
                                bg="RGBA(0, 0, 0, 0.08)"
                                minHeight="200px"
                                resize='none'
                                variant='unstyled'
                                overflow="hidden"
                                px='5px'
                                value={introduction}
                                onChange={e => {
                                    if(e.target.value.length <= 150){
                                        setIntroduction(e.target.value);
                                    }
                                }}
                            />
                            <Button bg="#ffe3f7" _hover={{ bg: "#ffcff1"}} className="w-full mt-5" onClick={handleSubmit}>Confirm</Button>
                        </Box>
                    </Flex>
                </Box>
                <Box flex={1.5} bg="bg-color.100" className="midCol">
                    <Flex flexDir="column" gap={3}>
                        <Flex gap={8} className="standardOutput">
                            <Box w="50%">
                                <Heading fontSize="xl">Last Name</Heading>
                                <Input
                                    py="4px"
                                    mt="5px"
                                    pl="10px"
                                    variant="unstyled"
                                    placeholder=""
                                    borderRadius="xl"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    bg="RGBA(0, 0, 0, 0.08)"
                                />
                            </Box>
                            <Box w="50%">
                                <Heading fontSize="xl">First Name</Heading>
                                <Input
                                    py="4px"
                                    mt="5px"
                                    pl="10px"
                                    variant="unstyled"
                                    placeholder=""
                                    borderRadius="xl"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    bg="RGBA(0, 0, 0, 0.08)"
                                />
                            </Box>
                        </Flex>

                        <Box>
                            <Heading fontSize="xl">Email</Heading>
                            <Input
                                py="4px"
                                mt="5px"
                                pl="10px"
                                variant="unstyled"
                                placeholder=""
                                borderRadius="xl"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                bg="RGBA(0, 0, 0, 0.08)"
                            />
                        </Box>

                        <Box>
                            <Heading fontSize="xl">Phone number</Heading>
                            <Input
                                py="4px"
                                mt="5px"
                                pl="10px"
                                variant="unstyled"
                                placeholder=""
                                borderRadius="xl"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                bg="RGBA(0, 0, 0, 0.08)"
                            />
                        </Box>

                        <Box>
                            <Heading fontSize="xl">Address</Heading>
                            <Input
                                py="4px"
                                mt="5px"
                                pl="10px"
                                variant="unstyled"
                                placeholder=""
                                borderRadius="xl"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                bg="RGBA(0, 0, 0, 0.08)"
                            />
                        </Box>

                        <Box>
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Heading fontSize="xl">Relationship</Heading>
                                <Button bg='bg-color.100' _hover={{ bg: 'RGBA(0, 0, 0, 0.08)' }}>
                                    <Icon as={HiDotsHorizontal} />
                                </Button>
                            </Flex>
                            <Text mt="3px" display='flex'>
                                <Icon 
                                    boxSize={6} 
                                    as={HiUserCircle}
                                    mr="5px"
                                />
                                Cupcake
                            </Text>
                        </Box>

                        <Box>
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Heading fontSize="xl">Date of Birth</Heading>
                                <Button bg='bg-color.100' _hover={{ bg: 'RGBA(0, 0, 0, 0.08)' }}>
                                    <Icon as={HiDotsHorizontal} />
                                </Button>
                            </Flex>
                            <Text mt="3px" display='flex'> 
                                <Icon
                                    boxSize={6}
                                    mr="2%"
                                    as={HiCake}
                                />
                                31-10-2003
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Box flex={0.1} className="rightCol">
                    <Box>
                        <Box
                            as={ReactRouterLink}
                            to="/profile"
                            className="CancelButton"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            _hover={{
                                background: "RGBA(0, 0, 0, 0.08)",
                                height: "100%",
                                borderRadius: "100%",
                                width: "100%"
                            }}
                        >
                            <Text fontSize="2xl">X</Text>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Center>
    );
}

export default ProfileDetail;

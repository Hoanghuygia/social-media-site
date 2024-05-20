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
import { useEffect, useReducer, useState } from "react";
import { HiUserCircle, HiBriefcase, HiDotsHorizontal } from "react-icons/hi";
import { Link as ReactRouterLink } from 'react-router-dom'

function ProfileDetail() {
    const [sidebarHeight, setSidebarHeight] = useState(0);

    useEffect(() => {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const windowHeight = window.innerHeight;
        const sidebarHeight = windowHeight - headerHeight;
        setSidebarHeight(sidebarHeight);
    }, []);

    
    const initState = {
        firstName: 'Swirl',
        lastName: 'Lolipop',
        email: 'dhaowinaowinodoana@gmail.com',
        phoneNumber: '+84783279012',
        address: 'Thu Duc city, HCM city',
        // introduction: 'Books are portals to different worlds, offering adventures, wisdom, and solace. Each page reveals new horizons, enriching minds and nurturing imaginations, making reading a timeless'
        introduction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }

    const SET_FIRST_NAME = 'set_first_name';
    const SET_LAST_NAME = 'set_last_name';
    const SET_EMAIL = 'set_email';
    const SET_PHONE_NUMBER = 'set_phone_number';
    const SET_ADDRESS = 'set_address';
    const SET_INTRO = 'set_introduction';

    const setFirstName = payload =>{
        return{
            type: SET_FIRST_NAME,
            payload
        }
    }

    const setLasttName = payload =>{
        return{
            type: SET_LAST_NAME,
            payload
        }
    }

    const setEmail = payload =>{
        return{
            type: SET_EMAIL,
            payload
        }
    }

    const setPhoneNumber = payload =>{
        return{
            type: SET_PHONE_NUMBER,
            payload
        }
    }

    const setAddress = payload =>{
        return{
            type: SET_ADDRESS,
            payload
        }
    }

    const setIntro = payload =>{
        return{
            type: SET_INTRO,
            payload
        }
    }

    const reducer = (state, action) =>{
        switch(action.type){
            case SET_FIRST_NAME:
                return{
                    ...state,
                    firstName: [action.payload]
                }
            case SET_EMAIL:
                return{
                    ...state,
                    email: [action.payload]
                }
            case SET_LAST_NAME:
                return{
                    ...state,
                    lastName: [action.payload]
                }
            case SET_PHONE_NUMBER:
                return{
                    ...state,
                    phoneNumber: [action.payload]
                }
            case SET_ADDRESS:
                return{
                    ...state,
                    address: [action.payload]
                }
            case SET_INTRO:
                return{
                    ...state,
                    introduction: [action.payload]
                }
            default:
                throw new Error("Invalid action");
        }
    }

    const [state, dispatch] = useReducer(reducer, initState);

    const {firstName, lastName, email, phoneNumber, address, introduction} = state;

    return (
        <Center bg="bg-color.100" h={`${sidebarHeight}px`}>
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
                            Swilrl Lollipop
                        </Heading>
                        <Text>Lorem ipsum dolor sit</Text>

                        <Box textAlign="left">
                            <Heading
                                as="h2"
                                fontSize="xl"
                                fontWeight="semibold"
                                color="RGBA(0, 0, 0, 0.4)"
                            >
                                Introduction:
                            </Heading>
                            <Textarea
                                borderRadius="xl"
                                bg="RGBA(0, 0, 0, 0.08)"
                                minHeight="200px"
                                resize='None'
                                variant='unstyled'
                                overflow="hidden"
                                px='5px'
                                value={introduction}
                                    onChange={e =>{
                                        if(e.target.value.length <= 350){
                                            dispatch(setIntro(e.target.value))
                                        }
                                    }}
                            />
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
                                    onChange={e =>{
                                        dispatch(setFirstName(e.target.value))
                                    }}
                                    bg="RGBA(0, 0, 0, 0.08)"
                                />
                            </Box>
                            <Box w="50%">
                                <Heading fontSize="xl">First Name</Heading>
                                {/* <Box
                                    py="4px"
                                    mt="5px"
                                    pl="10px"
                                    borderRadius="xl"
                                    bg="RGBA(0, 0, 0, 0.08)"
                                >
                                    Lollipop
                                </Box> */}
                                <Input
                                    py="4px"
                                    mt="5px"
                                    pl="10px"
                                    variant="unstyled"
                                    placeholder=""
                                    borderRadius="xl"
                                    value={lastName}
                                    onChange={e =>{
                                        dispatch(setLasttName(e.target.value))
                                    }}
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
                                onChange={e =>{
                                    dispatch(setEmail(e.target.value))
                                }}
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
                                onChange={e =>{
                                    dispatch(setPhoneNumber(e.target.value))
                                }}
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
                                onChange={e =>{
                                    dispatch(setAddress(e.target.value))
                                }}
                                bg="RGBA(0, 0, 0, 0.08)"
                            />
                        </Box>

                        <Box>
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Heading fontSize="xl">Realationship</Heading>
                                <Button bg='bg-color.100' _hover={{ bg: 'RGBA(0, 0, 0, 0.08)' }}>
                                    <Icon as={HiDotsHorizontal} />
                                </Button>
                            </Flex>
                            <Text mt="3px" display='flex' >
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
                                <Heading fontSize="xl">Jobs</Heading>
                                <Button bg='bg-color.100' _hover={{ bg: 'RGBA(0, 0, 0, 0.08)' }}>
                                    <Icon as={HiDotsHorizontal} />
                                </Button>
                            </Flex>
                            <Text mt="3px" display='flex'> 
                                <Icon
                                    boxSize={6}
                                    mr="5px"
                                    as={HiBriefcase}
                                />
                                CTy ABCXYZ 
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Box flex={0.1} className="rightCol">
                    <Box
                        
                    >
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

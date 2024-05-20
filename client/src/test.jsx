import { Button, Center, HStack, Tab } from "@chakra-ui/react";
import { Box, Image } from "chakra-ui/React";
import { useEffect, useReducer, useState } from "react";

function test() {
	// const [showGoToTop, setShowGoToTop] = useState(false);
    const initState = {
        job: '',
        jobs: []
    }

    const SET_JOB = 'set_hob'
    const ADD_JOB = 'add_job'
    const DELETE_JOB = 'delete_job'

    const setJob = payload =>{
        return {
            type: SET_JOB,
            payload
        }
    }

    const addJob = payload =>{
        return {
            type: ADD_JOB,
            payload
        }
    }

    const reducer = (state, action) =>{
        switch(action.type){
            case SET_JOB: 
                return {
                    ...state,
                    job: action.payload
                }
            case ADD_JOB:
                return{
                    ...state,
                    jobs: [...state.jobs, action.payload]
                }
            default:
                throw new Error('Invalid action')

        }
    }

    const [state, dispatch] = useReducer(reducer, initState);
    // =
    const {job, jobs} = state

    const handleSubmit = () =>{
        dispatch(addJob(job))
        dispatch(setJob(''))
    }

    // useEffect(() => {
	// 	const handleScroll = () =>{
	// 		setShowGoToTop(window.scrollY >= 200); // only one line to replace if else
	// 	}

	// 	window.addEventListener('scroll', handleScroll)
	// }, []);
    return (

        <div>
            <h3>Todo</h3>
            <input value={job} placeholder="Enter todo...." onChange={e =>{
                dispatch(setJob(e.target.value))
            }}/>
            <button onClick={handleSubmit}>Add</button>
            <ul>
            {jobs.map((job, index) =>(
                <li key={index}>{job}</li>
            ))}
                <li></li>
            </ul>
        </div>
        // <Center bg='gray.100' h='100vh'>
        //     <Box maxW='420px' bg='white' p='6'>
        //         <Image
        //             src=''
        //             slt=''
        //             borderRadius='xl'
        //             obhectFit='cover'
        //             mx='auto'
        //         />
        //         <HStack mt='5' spacing='3'>
        //             {['Waterfall', 'Nature'].map(item =>{
        //                 <Tab key={item} variant='outline'>
        //                     {item}
        //                 </Tab>
        //             })}
        //         </HStack>

        //         <Heading my='4' size='lg'>
        //             ABC
        //         </Heading>

        //         <Text>
        //             fdadfsjdjkdka
        //         </Text>

        //         <Center my='6'>
        //             <Button colorScheme='blue'>
        //                 Learn more
        //             </Button>
        //         </Center>
        //     </Box>
        // </Center>
       
    );
}

export default test;

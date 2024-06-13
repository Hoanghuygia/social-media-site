import WebCam from "react-webcam";
import { useRef } from "react";
import { Box, Flex, Circle, Icon } from "@chakra-ui/react";
import { HiOutlineCamera } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { setImageScreenShot } from "../stores/windowSlice";
import { useNavigate } from "react-router-dom";

function WebCamera() {
    const webCam = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const takeScreenshot = () => {
        const imageSrc = webCam.current.getScreenshot();
        if (imageSrc) {
            const file = dataURLToFile(imageSrc, "screenshot.png");
            console.log("file: ", file);
            dispatch(setImageScreenShot({ file, url: imageSrc }));
        }
        navigate("/message");
    };

    const dataURLToFile = (dataUrl, filename) => {
        let arr = dataUrl.split(",");
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    return (
        <Box
            bg={"black"}
            h={"100vh"}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Flex
                w={"86%"}
                flexDir={"row"}
                alignItems="center"
                justifyContent="center"
            >
                <Box flex={1} display="flex" justifyContent="center">
                    <WebCam
                        ref={webCam}
                        style={{
                            width: "100%",
                            height: "60%",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    />
                </Box>
                <Box
                    flex={0.1}
                    display="flex"
                    justifyContent="flex-end"
                    onClick={takeScreenshot}
                    alignItems="center"
                    h="100%"
                    w="100%"
                >
                    <Circle size="60px" bg="tomato" color="white">
                        <Icon
                            as={HiOutlineCamera}
                            cursor="pointer"
                        />
                    </Circle>
                </Box>
            </Flex>
        </Box>
    );
}

export default WebCamera;

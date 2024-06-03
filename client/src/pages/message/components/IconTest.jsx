import {
    Icon,
} from "@chakra-ui/react";
import { HiOutlineFolderPlus, HiXCircle } from "react-icons/hi2";

function IconTest({deleteImageFromBuffer}) {
    return (
        <Icon
            position="absolute"
            top="0"
            right="0"
            transform="translate(25%, -25%)"
            as={HiXCircle}
            boxSize="6"
            color="RGBA(0, 0, 0, 0.6)"
            _hover={{
                color: "RGBA(0, 0, 0, 0.4)",
            }}
            onClick={deleteImageFromBuffer}
        />
    );
}

export default IconTest;

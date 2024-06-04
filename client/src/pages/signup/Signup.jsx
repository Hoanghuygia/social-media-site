import SigninForm from "./SigninForm";

function Signup() {
    const style = {
        backgroundColor: "rgb(254, 249, 248)"
    }

    return(
        <>
            <div className="min-w-screen  min-h-screen	w-auto	h-auto" style={style}>
                <SigninForm />
                <img src="/img/Sugarcube.png" alt="Picture of creature and word" className="absolute w-[30%] left-[12%] top-[15%]" />
            </div>
        </>
    );
}

export default Signup;
import { AnimatePresence, motion } from "framer-motion";
import AppWindow from "../AppWindow";
import { useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/Store";
import { stateControlsUpdatePassword } from "../../Storage/Slices/Controls";
import "../../Styles/Apps/Controls.css";
import { attemptControlLogin } from "../../API/Auth";

const SettingsComponent = lazy(() => import("./AppsItems/ControlsSettings").then(module => {
    return {default: module.default}
}))

type PropTypes = {
    AppId: number,
    processName: string,
    processIcon: string
};

const exitAndOpen = {
    exit: {opacity: 0,},
    init: {opacity: 1, scale: 1}
}

function Controls(Props: PropTypes)
{
    const dispatch = useDispatch();
    const [writtenPassword, setWrittenPassword] = useState<string>("");
    const password = useSelector((x: RootState) => x.controlsState.password);

    function onChangeText(event: React.ChangeEvent<HTMLInputElement>)
    {
        setWrittenPassword(event.target.value);
        event.preventDefault();
    }

    function onSubmitPassword(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        event.preventDefault();
        authPassword(writtenPassword);
    }

    function onFormSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        authPassword(writtenPassword);
    }

    async function authPassword(password: string)
    {
        const result = await attemptControlLogin(password);
        if (result)
            dispatch(stateControlsUpdatePassword(writtenPassword));

    }

    return(
        <motion.div variants={exitAndOpen} exit="exit" transition={{duration: 0.1}} initial="init" animate="init" className="main-app-container">
            <AppWindow AppId={Props.AppId} processIcon={Props.processIcon} processName={Props.processName}>
                <div style={{width: "100%", height: "100%", border: "none"}}>
                    <div style={{widows: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        {
                        password === "sonic2000"?
                        <Suspense fallback={<h1>DAMN ITS LOADING RN BOYS ITS LADING</h1>}>
                            <SettingsComponent />
                        </Suspense>
                        :
                        <div className="login-container">
                            <form onSubmit={onFormSubmit} className="login-form">
                                <input className="control-password-input" type="password" onChange={onChangeText} placeholder="Password...." />
                                <button className="create-article-button" type="submit" onClick={onSubmitPassword}>Log In</button>
                            </form>
                        </div>
                        }

                    </div>
                </div>
            </AppWindow>
        </motion.div>
    )
}

export default Controls;
import {useContext} from "react";
import {ModalsContext} from "../contexts/modals-context";

export const useModals = () => {
    return useContext(ModalsContext)
}

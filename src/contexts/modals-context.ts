import {createContext} from "react";
import {ModalProps} from "../components/Modal/Modal";

export type ModalSettings = Omit<ModalProps, 'opened'>;

export type ModalState = { id: string; props: ModalSettings; }

export interface ModalsContextProps {
    modals: ModalState[];
    openModal: (props: ModalSettings) => string;
    closeModal: (id: string, canceled?: boolean) => void;
    closeAll: () => void;
}

export const ModalsContext = createContext<ModalsContextProps | null>(null)

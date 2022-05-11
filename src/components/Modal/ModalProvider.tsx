import React, {useReducer} from "react";
import {ModalsContext, ModalsContextProps, ModalSettings} from "src/contexts/modals-context";
import {randomId} from "src/utils";
import {modalsReducer} from "../../store/reducer";
import {Modal, ModalProps} from "./Modal";

export interface ModalsProviderProps {
    children: React.ReactNode;
    modalProps?: ModalSettings;
}

export const ModalProvider = (props: ModalsProviderProps) => {
    const {modalProps, children} = props;
    const [state, dispatch] = useReducer(modalsReducer, {modals: [], current: null});

    const openModal = (props: ModalSettings) => {
        const id = props.id || randomId();
        dispatch({
            type: 'OPEN',
            payload: {
                id,
                props,
            },
        });

        return id;
    };

    const closeAllModals = () => {
        state.modals.forEach((modal) => {
            modal.props?.onClose?.();
        });
        dispatch({type: 'CLOSE_ALL'});
    };

    const closeModal = (id: string) => {
        if (state.modals.length <= 1) {
            closeAllModals();
            return;
        }

        const modal = state.modals.find((item) => item.id === id);

        modal?.props?.onClose?.();
        dispatch({type: 'CLOSE', payload: modal?.id!});
    };

    const ctx: ModalsContextProps = {
        modals: state.modals,
        openModal,
        closeAll: closeAllModals,
        closeModal
    }

    const getCurrentModal = () => {
        if (state.current) {
            const {children: currentModalChildren, ...rest} = state.current?.props as ModalProps;

            return {
                modalProps: rest,
                content: <>{currentModalChildren}</>,
            };
        }

        return {
            modalProps: {},
            content: null,
        };
    };

    const {modalProps: currentModalProps, content} = getCurrentModal();

    return (
        <ModalsContext.Provider value={ctx}>
            <Modal
                {...modalProps}
                {...currentModalProps}
                onClose={() => closeModal(state.current?.id!)}
                opened={state.modals.length > 0}>
                {content}
            </Modal>
            {children}
        </ModalsContext.Provider>
    )
}

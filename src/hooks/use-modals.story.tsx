import {storiesOf} from "@storybook/react";
import {ModalProvider} from "../components/Modal/ModalProvider";
import {useModals} from "./use-modals";

function NestedModal() {
    const modals = useModals();
    const showContentModal = () =>
        modals?.openModal({
            title: 'Hello there',
            children: <span>My content modal</span>,
            onClose: () => console.log('content modal 1 closed'),
        });

    return <>
        <button onClick={showContentModal}>Open content modal</button>
    </>;
}

function Demo() {
    const modals = useModals();

    const showContentModal = () =>
        modals?.openModal({
            title: 'Hello there',
            children: <NestedModal />,
            onClose: () => console.log('content modal 1 closed'),
        });

    return (
        <button onClick={showContentModal}>Open content modal</button>
    )
}

storiesOf("Modals Manager", module).add("Custom Modal", () => (
    <ModalProvider>
        <Demo/>
    </ModalProvider>
));

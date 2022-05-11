import {storiesOf} from "@storybook/react";
import React, {useState} from "react";
import {Modal} from "./Modal";

function WrappedModal(
    props: Omit<React.ComponentPropsWithoutRef<typeof Modal>, 'opened' | 'onClose'>
) {
    const [opened, setOpened] = useState(true);

    return (
        <div style={{ padding: 50 }}>
            <button onClick={() => setOpened(true)}>Open Modal</button>
            <Modal title="Test modal" opened={opened} onClose={() => setOpened(false)} {...props} />
        </div>
    );
}

storiesOf("Modal", module)
    .add("Default", () => <WrappedModal><span>Test</span></WrappedModal>)

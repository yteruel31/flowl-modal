import storybook from '@storybook/react/standalone';
import path from "path";

storybook({
    port: 7520,
    mode: 'dev',
    configDir: path.join(__dirname, '../configuration/storybook'),
});

import React, { useRef, createContext } from 'react';
import { Section } from './Section';
import { TableRow } from './TableRow';
import { Entry } from './Entry';
import { TextInput } from './TextInput';
import { Result } from './Result';
import { Header } from './Header';
import '../css/table.css';

const gon = {
    email: 'katie@pwc.com',
    name: 'Katie',
    role: 'Admin'
};

const GonContext = React.createContext();

const Content = () => {
    const inputRef = useRef();
    const [url, setUrl] = React.useState(null);
    React.useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <GonContext.Provider value={gon}>
            <div className="content">
                <Header />
                <h2>Details for accessing the api</h2>

                <Section title="Step 1. Define the API URL">
                    <TextInput ref={inputRef} placeholder="https://jsonplaceholder.typicode.com/todos/1" />
                    <h3>Your URL is made up of these parts</h3>
                    <p>Indicate which parts of the url will be controlled by the user using the buttons below.</p>
                    <table>
                        <TableRow>
                            <th>Url piece</th>
                            <th>User editable</th>
                            <th>Details</th>
                        </TableRow>
                        <TableRow>
                            <td>/api</td>
                            <td><input type="checkbox" /></td>
                            <td></td>
                        </TableRow>
                        <TableRow>
                            <td>/v1</td>
                            <td><input type="checkbox" /></td>
                            <td></td>
                        </TableRow>
                    </table>
                </Section>

                <Section title="Step 2. Define any custom headers">
                    <h4>Current headers</h4>
                    <Entry id="1" key="app_id" value="/api" />
                    <Entry id="2" key="app_key" value="753453453ae4234345" />
                </Section>

                <button type="button" className="connect" onClick={() => setUrl(inputRef.current.value)}>Connect</button>

                <Result url={url} />
            </div>
        </GonContext.Provider>
    )
};

export { Content, GonContext };
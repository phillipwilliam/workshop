import React from 'react';
import ReactDOM from 'react-dom';

const Content = () => (
    <div className="content">
        <h2>Details for accessing the api</h2>
        <div className="sectionHeading">Step 1. Define the API URL</div>
        <div className="sectionContent">
          <input type="text" placeholder="http://sample.com" />
          <h3>Your URL is made up of these parts</h3>
          <p>Indicate which parts of the url will be controlled by the user using the buttons below.</p>
          <table>
              <tbody>
                  <tr>
                      <th>Url piece</th>
                      <th>User editable</th>
                      <th>Details</th>
                  </tr>
              </tbody>
              <tbody>
                  <tr>
                      <td>/api</td>
                      <td><input type="checkbox" /></td>
                      <td></td>
                  </tr>
              </tbody>
              <tbody>
                  <tr>
                      <td>/v1</td>
                      <td><input type="checkbox" /></td>
                      <td></td>
                  </tr>
              </tbody>
          </table>
        </div>
        <div className="sectionHeading">Step 2. Define any custom headings</div>
        <div className="sectionContent">
            <h4>Current headers</h4>
            <div className="row">
                <div className="column">
                    <label htmlFor="app_id">Key</label>
                    <input type="text" value="app_id" id="app_id" />
                </div>
                <div className="column">
                    <label htmlFor="app_id_value">Value</label>
                    <input type="text" value="/api" id="app_id_value" />
                </div>
                <div className="column"><button type="button" className="remove">remove</button></div>
            </div>
        </div>
    </div>
);

ReactDOM.render(
    <Content />,
    document.getElementById('root')
);
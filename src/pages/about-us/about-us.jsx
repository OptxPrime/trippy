import './about-us.css';

import {Navbar} from "../../components/Navbar/Navbar";

export const AboutUs = () => {

    return (
    <>
        <Navbar/>
        <div className="w3-container w3-center info-container">
            <h2>About page author</h2>
            <table
                className="w3-table w3-border w3-table-responsive"
            >
                <tbody>
                    {/*m-2 bg-sky-300 dark:bg-sky-700 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black*/}
                    <tr className="bg-sky-200 dark:bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:text-white dark:hover:text-black">
                        <th className="bg-sky-300 dark:bg-sky-700">Name</th>
                        <td>Tarik Džaka</td>
                    </tr>
                    <tr className="bg-sky-200 dark:bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:text-white dark:hover:text-black">
                        <th className="bg-sky-300 dark:bg-sky-700">Date of birth</th>
                        <td>18.04.2000.</td>
                    </tr>
                    <tr className="bg-sky-200 dark:bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:text-white dark:hover:text-black">
                        <th className="bg-sky-300 dark:bg-sky-700">Place of birth</th>
                        <td>Sarajevo</td>
                    </tr>
                    <tr className="bg-sky-200 dark:bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:text-white dark:hover:text-black">
                        <th className="bg-sky-300 dark:bg-sky-700">Studies at</th>
                        <td>Factulty of Science Sarajevo</td>
                    </tr>
                    <tr className="bg-sky-200 dark:bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:text-white dark:hover:text-black">
                        <th className="bg-sky-300 dark:bg-sky-700">Interests</th>
                        <td>Math, computer science, philosophy</td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div className="w3-container w3-center info-container">
            <h2>Course info</h2>
            <table
                className="w3-table w3-border w3-table-responsive"
            >
                <tbody>
                    {/*m-2 bg-sky-300 dark:bg-sky-700 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black*/}
                    <tr className="bg-sky-200 dark:bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:text-white dark:hover:text-black">
                        <th className="bg-sky-300 dark:bg-sky-700">Name</th>
                        <td>Dynamic Web Systems</td>
                    </tr>
                    <tr className="bg-sky-200 dark:bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:text-white dark:hover:text-black">
                        <th className="bg-sky-300 dark:bg-sky-700">ECTS points</th>
                        <td>5</td>
                    </tr>
                    <tr className="bg-sky-200 dark:bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:text-white dark:hover:text-black">
                        <th className="bg-sky-300 dark:bg-sky-700">Teaching professor</th>
                        <td> prof.dr. Adis Alihodžić</td>
                    </tr>
                    <tr className="bg-sky-200 dark:bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:text-white dark:hover:text-black">
                        <th className="bg-sky-300 dark:bg-sky-700">Teaching assistant</th>
                        <td>Eldina Delalić, MA</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
    );
}
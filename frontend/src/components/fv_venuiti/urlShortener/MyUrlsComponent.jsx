import React, {useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../template/Title';
import DashboardService from "../../../api/ShortUrlService";
import {APP_URI} from "../../../Constants";
import Link from "@material-ui/core/Link";

export default function MyUrlsItens(props) {
    if (props.data !== undefined) {
        console.log(props.data);
    }
    const [data, setData] = React.useState([]);

    useEffect(() => {
        DashboardService.getMyShortenedUrlsData().then(
            response => {
                if (response.data !== undefined) {
                    setData(response.data);
                }

            }
        );
    }, [props.data]);

    return (
        <React.Fragment>
            <Title>My Shortened URLs</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Created in</TableCell>
                        <TableCell>Valid Until</TableCell>
                        <TableCell>Shortener URL</TableCell>
                        <TableCell>Original URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{new Date(row.dateCreation).toDateString()}</TableCell>
                            <TableCell>{new Date(row.dateValid).toDateString()}</TableCell>
                            <TableCell><Link href={APP_URI + "/" + decodeURIComponent(row.shortenedUrl)}
                                             target={"_blank"}>{APP_URI + "/" + row.shortenedUrl}</Link></TableCell>
                            <TableCell><Link href={decodeURIComponent(row.originalUrl)}
                                             target={"_blank"}>{decodeURIComponent(row.originalUrl)}</Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}

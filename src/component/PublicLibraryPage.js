'use strict'

import ReactDOM from 'react-dom'; 

import React from 'react';

import { connect } from 'react-redux';

import {
    Grid,
    Row,
    Col,
    Button,
} from 'react-bootstrap';

import actions from '../../redux/actions';

import { redirect } from '../util/webUtil';

import { publishNoti } from '../util/notificationUtil';

@connect((state) => state)
export default class PublicLibraryPage extends React.Component {
	componentDidMount() {
		$(ReactDOM.findDOMNode(this.publicDocumentList)).dataTable({
	      	// responsive: true,
	      	// stateSave: true,
	      	// paging: true,
	      	// searching: true,
	      	// order: [ 0, 'asc' ],
	      	// columnDefs: [
	       //  	// {searchable: false, targets: 0},
	       //  	// {visible: false, targets: 0},
	       //  	// {orderable: false, targets: 1},
	       //  	// {searchable: false, targets: 1},
	      	// ],
	    })
	}

	handleSaveLibrary(document) {
		this.props.dispatch(actions.addDocumentPersonal(document));
		redirect('/my_library');
		publishNoti('info', 'Successfully added document to your personal library!');
	}

	renderTableHeader() {
		return (
			<thead>
	            <tr>
	                <th>Name</th>
	                <th>Language</th>
	                <th></th>
	            </tr>
	        </thead>
		);
	}

	renderTableBody(list) {
		return (
			<tbody>
				{
					list.map((record, idx) => {
						return this.renderTableRow(record, idx)
					})
				}
			</tbody>
		);
	}

	renderTableRow(record, idx) {
		return (
			<tr key={`my-library-row-${idx}`}>
				<td>
					{record.name}
				</td>
				<td>
					{record.lang}
				</td>
				<td>
					<a id={`download-link-${record.link}`} href={`${record.link}`} download />
					<Button
						bsSize="sm"
						bsStyle="info"
						onClick={() => document.getElementById(`download-link-${record.link}`).click()}
					>
						Download
					</Button>
					&emsp;
					<Button
						bsSize="sm"
						bsStyle="info"
						onClick={() => ::this.handleSaveLibrary(record)}
					>
						Add to my library
					</Button>
				</td>
			</tr>
		);
	}

    render() {
    	const list = this.props.publicLib.documentList;
        return (
            <div id="my-library-container">
	        	<Grid>
	        		<table ref={(c) => this.publicDocumentList=c} className='display' cellSpacing='0' width='100%'>
	        			{this.renderTableHeader()}
	        			{this.renderTableBody(list)}
	        		</table>
        		</Grid>
	        </div>
        );
    }
}

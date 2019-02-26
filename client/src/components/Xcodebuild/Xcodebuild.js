import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as xcodebuildActions from '../../store/actions/';
import { Container, GridItem, Title } from '../../containers/';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Xcodebuild extends Component {
	state = {
		messager: null
	};

	renderTableHead() {
		return (
			<TableHead>
				<TableRow>
					<TableCell>#</TableCell>
					<TableCell align="right">USER</TableCell>
					<TableCell align="right">PID</TableCell>
					<TableCell align="right">CPU %</TableCell>
					<TableCell align="right">MEM %</TableCell>
					<TableCell align="right">VSZ</TableCell>
					<TableCell align="right">RSS</TableCell>
					<TableCell align="right">TT </TableCell>
					<TableCell align="right">STAT Started </TableCell>
					<TableCell align="right">Time command </TableCell>
				</TableRow>
			</TableHead>
		)
	}

	renderTableCells(cellData, rowNumber) {
		if(cellData.length > 0) {
			let tableData = []
			tableData.push(<TableCell align="right">{rowNumber}</TableCell>)
			cellData.map(data => {
				tableData.push(<TableCell align="right">{data}</TableCell>)
			})

			return tableData
		} else {
			return null
		}
	}

	renderTable() {
		return (
			<Table>
					{this.renderTableHead()}
					{this.renderTableRows()}
			</Table>)
	}

	renderTableRows() {
		const { processes } = this.props;
		return (
			<TableBody>
				{processes.length > 0 ? processes.map((process, index) => (
					<TableRow>
						{this.renderTableCells(process, index)}
					</TableRow>
				)): null }
		</TableBody>
		)
	}

	render() {
		return (
			<Container>
				<GridItem xs={12}>
					<Title header={'h5'}> xcodebuild process info table</Title>
				</GridItem>
				<GridItem xs={12}>
					{this.renderTable()}
				</GridItem>
				<Button color="primary" variant="contained" onClick={() => this.props.getXcodebuildProcesses()} >
					Reset
				</Button>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		processes: state.xcodebuild.processes,
		loading: state.xcodebuild.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getXcodebuildProcesses: () => dispatch(xcodebuildActions.getXcodebuildInfo())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Xcodebuild);

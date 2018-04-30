import * as React from 'react';
import styles from './TestApp.module.scss';
import { ITestAppProps } from './ITestAppProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';
import { Label, DefaultButton, SearchBox, TextField } from 'office-ui-fabric-react';
import {Grid} from 'office-ui-fabric-react/lib/Grid';
import Search from './Search';
//import bootstrap from '../../../../node_modules/bootstrap/dist/css/bootstrap.min';


export interface IReactGetItemsState {
  value: string;
  items: [
    {
      "Title": "",
      "Business": "",
      "Division": "",
      "Country": "",
      "Description": "",
      "SiteTemplate": "",
      "AditionalRequirements": "",
      "SiteType": "",
      "IsProvisioned": ""
    }];
  test: string;
}

export interface IReactGetItemsProps {
  description: string;
  siteurl: string;
}

class TestApp extends React.Component<ITestAppProps, { items, test, }> {

  private name = '';

  public constructor(props: IReactGetItemsProps, state: IReactGetItemsState) {

    super(props);

    this.alert2 = this.alert2.bind(this);

    this.state = {
      items: [
        {
          "Title": "",
          "Business": "",
          "Division": "",
          "Country": "",
          "Description": "",
          "SiteTemplate": "",
          "AditionalRequirements": "",
          "SiteType": "",
          "IsProvisioned": ""
        }
      ],
      test: ''
    };
  }

  public InvokeTable() {
    var reactHandler = this;
    let title = "";
    let business = "";
    let division = "";
    let country = "";

    jquery.ajax({
      url: `${this.props.siteurl}/_api/web/lists/getbytitle('SiteRegisterList')/items`,
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },

      success: (resultData) => {

        let len = Object.keys(resultData.d.results).length;

        for (let index = 0; index < len; index++) {

          title = Object.values(resultData.d.results[index].Title).join("").toLowerCase();
          business = Object.values(resultData.d.results[index].Business).join("").toLowerCase();
          division = Object.values(resultData.d.results[index].Division).join("").toLowerCase();
          country = Object.values(resultData.d.results[index].Country).join("").toLowerCase();
          
          if (this.name == "*") {
            reactHandler.setState({
              items: resultData.d.results
            });
          }

          // TODO Show message - toastr
          else if (this.name.length < 2) {
            return console.log("Input must be at least 2 character");
          }

          else if (title == this.name || business == this.name || division == this.name || country == this.name) {
            reactHandler.setState({
              items: [...this.state.items, resultData.d.results[index]]
            });
          }
        }
      },

      error: (jqXHR, textStatus, errorThrown) => {
      }
    });
  }


  private alert2(test) {
    this.setState({ test: '' });

    this.name = test;

    this.setState({
      items: [
        // {
        //   "Title": "",
        //   "Business": "",
        //   "Division": "",
        //   "Country": ""
        // }
      ]
    })

    this.InvokeTable();
  }

  render() {
    return (
      <div className={styles.panelStyle} >
        <div className={styles.tableStyle} >

          <Search OnClickValue={this.alert2} />

          <div className={styles.headerStyle} >
            <div className={styles.CellStyle}>Name</div>
            <div className={styles.CellStyle}>Business</div>
            <div className={styles.CellStyle}>Division</div>
            <div className={styles.CellStyle}>Country</div>
            <div className={styles.CellStyle}>Description</div>
            <div className={styles.CellStyle}>SiteTemplate</div>
            <div className={styles.CellStyle}>AditionalRequirements</div>
            <div className={styles.CellStyle}>SiteType</div>
            <div className={styles.CellStyle}>IsProvisioned</div>
          </div>

          {this.state.items.map((item, key) => {
            return (<div className={styles.rowStyle} key={key}>
              <div className={styles.CellStyle}>{item.Title}</div>
              <div className={styles.CellStyle}>{item.Business}</div>
              <div className={styles.CellStyle}>{item.Division}</div>
              <div className={styles.CellStyle}>{item.Country}</div>
              <div className={styles.CellStyle}>{item.Description}</div>
              <div className={styles.CellStyle}>{item.SiteTemplate}</div>
              <div className={styles.CellStyle}>{item.AditionalRequirements}</div>
              <div className={styles.CellStyle}>{item.SiteType}</div>
              <div className={styles.CellStyle}>{item.IsProvisioned}</div>
            </div>);
          })}
        </div>
      </div>
    );
  }
}

export default TestApp;
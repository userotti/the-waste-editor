import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import loadingActions from '../../actions/assetActions/loading'
import {
  setTilesetJSONFileLocation,
  setTilesetSpritesheetFileLocation,
  setTilemapJSONFileLocation
} from '../../actions/assetActions/fileLocations'
import { createNewGame, newUserLanded } from '../../actions/socketActions'
import { assetManager } from '../../singletons/AssetManager'
import { push } from 'react-router-redux';
import styled from 'styled-components';


const FormItem = Form.Item;
const { loadTilesetJSON, loadTilemapJSON, loadTilesetSpritesheet, allAssetsLoaded } = loadingActions;


const Container = styled.div`
padding: 20px;

Input {
  width: 400px;
  margin-bottom: 10px;
}

Button {
  background-color: #00f;
  color: white;
  padding: 5px;
}

`

class LoadingScreen extends Component {
  state = {
    loadingRequest: false,
    requestError: false,
    requestSuccess: false,
    errorMessage: '',
  }

  componentDidMount() {
    this.flushAssets();

  }

  componentWillUnmount() {

  }

  componentDidUpdate() {

  }

  flushAssets() {

  }

  loadAssets = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      this.flushAssets();
      if (!err) {

        this.setState({
          loadingRequest: true,
          requestError: false
        })

        Promise.all([
          this.props.loadTilesetJSON(values.tilesetJSONLocation),
          this.props.loadTilesetSpritesheet(values.tilesetSpritesheetLocation),
          this.props.loadTilemapJSON(values.tilemapJSONLocation)
        ]).then((response)=>{

          this.props.allAssetsLoaded();
          this.props.push('/static-canvas');

        }).catch((err)=>{

          console.error("loading err", err);
          this.setState({
            loadingRequest: false,
            requestError: true
          })
        })
      }
    });

  }

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <Container>
        <Form layout="inline" onSubmit={(e) => this.loadAssets(e)}>
          <FormItem>
            {getFieldDecorator('tilesetJSONLocation', {
              rules: [{ required: false }],
              initialValue: this.props.tilesetJSONLocation,
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('tilesetSpritesheetLocation', {
              rules: [{ required: false }],
              initialValue: this.props.tilesetSpritesheetLocation,
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('tilemapJSONLocation', {
              rules: [{ required: false }],
              initialValue: this.props.tilemapJSONLocation,
            })(
              <Input/>
            )}
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={false}
              autoFocus={true}

              >
                Load Assets
              </Button>
            </FormItem>

          </Form>
        </Container>

      );

    }
  }

  const WrappedLoadingScreen = Form.create()(LoadingScreen);

  export default connect(
    state => ({
      tilesetJSONLocation: state.assetState.fileLocations.tilesetJSONLocation,
      tilesetSpritesheetLocation: state.assetState.fileLocations.tilesetSpritesheetLocation,
      tilemapJSONLocation: state.assetState.fileLocations.tilemapJSONLocation,

      tilesetJSON: state.assetState.tilesetJSON,
      tilesetImageLoaded: state.assetState.tilesetImage,
      tilemapJSON: state.assetState.tilemapJSON

    }),
    {
      loadTilesetJSON,
      loadTilemapJSON,
      loadTilesetSpritesheet,
      push,
      allAssetsLoaded
    }
  )(WrappedLoadingScreen);

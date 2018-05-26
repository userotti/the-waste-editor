import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import loadingActions from '../../actions/tiledActions/loading'
import {
  setTilesetJSONFileLocation,
  setTilesetSpritesheetFileLocation,
  setTilemapJSONFileLocation
} from '../../actions/tiledActions/fileLocations'

import { assetManager } from '../../singletons/AssetManager'
import { push } from 'react-router-redux';
import styled from 'styled-components';


const FormItem = Form.Item;
const { loadTilesetJSON, loadTilemapJSON, loadTilesetSpritesheet, allTiledAssetsLoaded } = loadingActions;


const Container = styled.div`
padding: 20px;

Input {
  width: 400px;
  margin-bottom: 10px;
}

Button {
  background-color: #00f;
  color: white;
  padding: 20px;
}

`

const LoadedAssets = styled.div`
display: flex;
align-items: flex-start;
`

const LoadedAssetSection = styled.div`
padding: 20px;
background-color: #f3f3f3;
margin: 20px;
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

          this.props.allTiledAssetsLoaded();
          // this.props.push('/static-canvas');

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

          <LoadedAssets>

            <LoadedAssetSection>
              <h2>Tile Set JSON</h2>
              <pre>
                <code>
                  { JSON.stringify(this.props.tilesetJSON, null, 4) }
                </code>
              </pre>
            </LoadedAssetSection>

            <LoadedAssetSection>
              <h2>Tile Map JSON</h2>
              <pre>
                <code>
                  { JSON.stringify(this.props.tilemapJSON, null, 4) }
                </code>
              </pre>
            </LoadedAssetSection>

          </LoadedAssets>

      </Container>

    );

  }
}

const WrappedLoadingScreen = Form.create()(LoadingScreen);

export default connect(
  state => ({
    tilesetJSONLocation: state.tiledState.fileLocations.tilesetJSONLocation,
    tilesetSpritesheetLocation: state.tiledState.fileLocations.tilesetSpritesheetLocation,
    tilemapJSONLocation: state.tiledState.fileLocations.tilemapJSONLocation,

    tilesetJSON: state.tiledState.tiledData.tilesetJSON,
    tilesetImageLoaded: state.tiledState.tilesetImage,
    tilemapJSON: state.tiledState.tiledData.tilemapJSON

  }),
  {
    loadTilesetJSON,
    loadTilemapJSON,
    loadTilesetSpritesheet,
    push,
    allTiledAssetsLoaded
  }
)(WrappedLoadingScreen);

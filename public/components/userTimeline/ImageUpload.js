import React, {Component} from 'react';
import sha1 from 'sha1';
import superagent from 'superagent';
import axios from 'axios';

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      description: '',
      images: [],
      imagePreview: '',
      fileName: '',
      allPost: this.props.allPost,
      styling: {
        display: 'none'
      },
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.displayUpload !== 'none') {
      this.setState({
        styling: {
          display: 'inline-block'
        }
      })
    } else {
      this.setState({
        styling: {
          display: 'none'
        }
      })
    }
  }

  _handleInputChange(e) {
    e.preventDefault();
    this.setState({
      description: e.target.value
    });
  }

  //method for saving images to cloudery
  _handleSubmit(e) {
    e.preventDefault();
    const image = this.state.file;

    const cloudName = 'dgjnetyeq';
    const url =  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const timestamp = Date.now()/1000;
    const uploadPreset = 'jlgmapzb';

    const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}THuBkxHSIrtLd3rznaNWSgk6T48`;

    const signature = sha1(paramsStr);

    const params = {
      'api_key': 615118835579627,
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    };

    const context = this;

    let uploadRequest = superagent.post(url);
    uploadRequest.attach('file', image);

    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key]);
    });

    uploadRequest.end((err, resp) => {
      if (err) {
        console.log('Error in uploading image ', err);
        return;
      }
      const uploaded = resp.body;

      //post user submitted photo url to database (post table)

      axios.get('/api/session')
      .then(function(response) {
        if (response.data) {
          var user = response.data;
          var photo = {
            type: 'photo',
            filePath: resp.body.secure_url,
            parkId: context.props.parkId,
            userId: user.id,
            description: context.state.description,
            firstName: user.firstName
          };
          axios.post('/api/userTimeline', photo)
          .then(function (resp) {
            context.props.addPhoto();
            var allPost = [resp.data].concat(context.state.allPost);

            context.setState({
              allPost: allPost,
              file: '',
              imagePreviewUrl: '',
              description: '',
              images: [],
              imagePreview: null,
              fileName: ''
            });
          })
          .catch(function (error) {
          });
        }
      });

      // context.setState({
      //   file: '',
      //   imagePreviewUrl: '',
      //   description: '',
      //   images: [],
      //   imagePreview: null,
      //   fileName: ''
      // }, function () {
      //   // context.props.addPhoto();
      // });
    });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        fileName: file.name
      });
    };
    reader.readAsDataURL(file);
  }

  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img src={this.state.imagePreviewUrl} className="imgPreview" />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    let list = this.state.images.map((image, i) => {
      return (
        <li key={i}>
          <img src={image.secure_url} />
        </li>
      )
    });

    return (
      <div className="previewComponent" style={this.state.styling}>
        <form className="preview-form" onSubmit={(e)=>this._handleSubmit(e)}>
          <div className="photo-fields">
            <input

              className="fileInput"
              type="file"
              onChange={(e)=>this._handleImageChange(e)}
            />
            <label>
              <input className="photo-input"
                placeholder="Say something about this photo..."
                type="text"
                value={this.state.description}
                onChange={this._handleInputChange}
              />
              <span>{this.state.description}</span>
            </label>
            <button
              className="submitButton photoButton"
              type="submit"
              onClick={(e)=>this._handleSubmit(e)}>Post Status
            </button>
          </div>
        </form>

          {$imagePreview}
          <hr/>
        <div className="displayImageDescription">
        </div>
      </div>
    )
  }
}

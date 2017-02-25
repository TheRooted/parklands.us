import React, {Component} from 'react';
import sha1 from 'sha1';
import superagent from 'superagent';
import axios from 'axios';

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      list: [],
      imagePreviewUrl: '',
      description: '',
      images: []
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  _handleInputChange(e) {
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
      console.log('UPLOAD Complete', JSON.stringify(resp.body));
      const uploaded = resp.body;

      //post user submitted photo url to database (post table)
      console.log('this.state.file is == ', this.state.file);
      axios.post('/api/userTimeline', {
        type: 'photo',
        filePath: resp.body.secure_url,
        userId: 1,
        parkId: 1
      })
      .then(function (resp) {
        console.log('succesfull url saved ---', resp);
      })
      .catch(function (error) {
        console.error('error saving to post table--- ', error);
      });

      let updatedImages = Object.assign([], uploaded);


      this.setState({
        images: updatedImages
      }, function (){
        this.setState({list: this.state.images});
        console.log(this.state.list);
      });
    });

    console.log('handle uploading-', this.state.file);
    console.log('description is - ', this.state.description);


  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    console.log('this.state.images ',this.state.images );

    let list = this.state.images.map((image, i) => {
      return (
        <li key={i}>
          <img src={image.secure_url} />
        </li>
      )
    });

    console.log("LIST", this.state.list);
    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={(e)=>this._handleImageChange(e)}
          />
          <label>
            Description:
            <input
              type="text"
              value={this.state.description}
              onChange={this._handleInputChange}
            />
          </label>
          <button
            className="submitButton"
            type="submit"
            onClick={(e)=>this._handleSubmit(e)}>Post Status
          </button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>

        <div className="displayImageDescription">
          <ol>
            {console.log(this.state.list)}
          </ol>
        </div>
      </div>
    )
  }
}

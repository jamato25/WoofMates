import React, { Component } from 'react'
import { PROFESSIONS, USER_INTERESTS, BREEDS, MAX_DISTANCES, MAX_USER_AGE, DOG_AGE_PREFS, DOG_WEIGHT_PREFS, MIN_USER_AGE, AGE_RANGE } from '../../constants'

import TextField from '@material-ui/core/TextField';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  root: {
    '& .MuiTextField-root': {
      margin: 10,
      width: 200,
    },
  },
};

class DealbreakersPreferences extends Component{
  constructor(props){
      super(props)
      this.arrForNums = ['age', 'dogAge', 'energyLevel', 'weight', 'distanceFromLocation']
      this.tempUserInterests = []
      this.tempDogInterests = []
      this.tempUserInterestsPrefs = []
      this.tempUserProfessionPrefs = []
      this.state = {
          dogBreedPref: '',
          dogAgePref: '',
          dogEnergyLevelPref: null,
          dogWeightPref: '',
          distanceFromLocation: 5,
          userAgePrefMinRange: null,
          userProfessionsPref: [],
          userInterestsPref: [],
          isNeuteredDealbreaker: null,
      };
      this.onChange = this.onChange.bind(this);
      this.sendData = this.sendData.bind(this);
      this.photoUpload = this.photoUpload.bind(this);
  }
  sendData(){
    const { isNeuteredDealbreaker } = this.state
    if (isNeuteredDealbreaker === null) alert('Please fill in all required fields! Fields marked with * are required.')
    else this.props.updateData(this.state)
  }
  photoUpload(photoObj){
    this.setState(photoObj)
  }
  onChange (e) {
    if (e.target.name === 'userInterestsList') {
      this.tempUserInterests.push(e.target.value)
      this.setState({
        userInterests: this.tempUserInterests
      })
    }

    else if (e.target.name === 'userEmail') {
      let newEmail = e.target.value.toLowerCase()
      this.setState({
        userEmail: newEmail
      })
    }

    else if (e.target.name === 'dogInterestsList') {
      this.tempDogInterests.push(e.target.value)
      this.setState({
        dogInterests: this.tempDogInterests
      })
    }

    else if (e.target.name === 'userProfessionsPref') {
      this.tempUserProfessionPrefs.push(e.target.value)
      this.setState({
        userProfessionsPref: this.tempUserProfessionPrefs
      })
    }

    else if (e.target.name === 'userInterestsPref') {
      this.tempUserInterestsPrefs.push(e.target.value)
      this.setState({
        userInterestsPref: this.tempUserInterestsPrefs
      })
    }

    else if (this.arrForNums.includes(e.target.name)) {
      this.setState({
        [e.target.name]: Number(e.target.value)
      })
    }

    else if (e.target.name === 'neutered') {
      let neuteredBool = (e.target.value === 'true')
      this.setState({
        [e.target.name]: neuteredBool
      })
    }

    else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }
  render(){
    const { classes } = this.props;
    let userAgePrefRanges = [ <MenuItem value="none" selected disabled hidden>Select an MenuItem</MenuItem> ]
    for (let minRange = MIN_USER_AGE; minRange < MAX_USER_AGE; minRange += AGE_RANGE + 1) {
      userAgePrefRanges.push(
        <MenuItem key={minRange} value={minRange}>
        {minRange} - {minRange + AGE_RANGE}
        </MenuItem>
      )
    }
    return (
      <div className={classes.root} noValidate autoComplete="off">
        <h3>Tell us your dealbreakers and preferences!</h3>
        <h4>Answer a few prompts to help personalize your matches...or leave it to our magic behind the scenes!</h4>
        Does your new dog friend need to be neutered?*
        <TextField required select id="isNeuteredDealbreaker" name="isNeuteredDealbreaker" onChange={this.onChange}>
          <MenuItem value={true}>I only want to be matched with neutered dogs</MenuItem>
          <MenuItem value={false}>I can be matched with dogs regardless of neutered status</MenuItem>
        </TextField>
        <p />
        Maximum distance between you and your new dog friends:
        <TextField select id="distanceFromLocation" name="distanceFromLocation" onChange={this.onChange}>
            {MAX_DISTANCES.map(distance => (<MenuItem key = {distance} value={distance}>{distance}</MenuItem>))}
        </TextField>
        <p />
        In an ideal world, I'd like to be matched with a <strong>dog</strong> with the below characteristics:
        <br />
        <TextField select label="Breed" id="dogBreedPref" name="dogBreedPref" onChange={this.onChange}>
            {BREEDS.map(breed => (<MenuItem key={breed} value={breed}>{breed}</MenuItem>))}
        </TextField> 
        <TextField select label="Age vs. my dog" id="dogAgePref" name="dogAgePref" onChange={this.onChange}>
          {DOG_AGE_PREFS.map(agePref => (<MenuItem key = {agePref} value={agePref}>{agePref}</MenuItem>))}
        </TextField>
        <TextField select label="Energy level" id="dogEnergyLevelPref" name="dogEnergyLevelPref" onChange={this.onChange}>
          <MenuItem value="1">1 (Lowest)</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5 (Highest)</MenuItem>
        </TextField>
        <TextField select label="Size vs. my dog" id="dogWeightPref" name="dogWeightPref" onChange={this.onChange}>
          {DOG_WEIGHT_PREFS.map(weightPref => (<MenuItem key = {weightPref} value={weightPref}>{weightPref}</MenuItem>))}
        </TextField>
        <p />
        In an ideal world, I'd like to be matched with a <strong>pet owner </strong> with the below characteristics:
        <br />
        Works in (choose up to 2): 
        <br />
        <TextField select label="Profession" className="userProfessionsPref" name="userProfessionsPref" onChange={this.onChange}>
            {PROFESSIONS.map(profession => (<MenuItem key = {profession} value={profession}>{profession}</MenuItem>))}
        </TextField>
        <TextField select label="Profession"  className="userProfessionsPref" name="userProfessionsPref" onChange={this.onChange}>
            {PROFESSIONS.map(profession => (<MenuItem key = {profession} value={profession}>{profession}</MenuItem>))}
        </TextField>
        <br />
        Has interests in (choose up to 2): 
        <br />
        <TextField select label="Interest" className="userInterestsPref" name="userInterestsPref" onChange={this.onChange}>
          {USER_INTERESTS.map(interest => (<MenuItem key = {interest} value={interest}>{interest}</MenuItem>))}
        </TextField>
        <TextField select label="Interest" className="userInterestsPref" name="userInterestsPref" onChange={this.onChange}>
            {USER_INTERESTS.map(interest => (<MenuItem key = {interest} value={interest}>{interest}</MenuItem>))}
        </TextField>
        <br />
        <TextField select label="Age Range" type="userAgePrefMinRange" name="userAgePrefMinRange" onChange={this.onChange}>{userAgePrefRanges}</TextField>
        <p />
        <div className="registration-buttons">
          <Button className="back-button" variant="contained" color="secondary" onClick={this.props.goBack}>Back</Button>
          <Button className="next-button submit" variant="contained" color="secondary" onClick={this.sendData} type="submit">Register</Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(DealbreakersPreferences);

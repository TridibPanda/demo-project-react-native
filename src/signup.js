/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  AsyncStorage,
  ScrollView
} from 'react-native';
import {Item, Input, Icon, Label} from 'native-base';
//import axios from 'axios';
//import base64 from 'base-64';
//import Icon from 'react-native-vector-icons/Ionicons';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      icon: 'eye',
      type: true,
    };
  }

  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      type: !prevState.type,
    }));
  }

  signupForm = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      this.props.navigation.navigate('Otp');
    }
  };

  validateForm = () => {
    let fname = this.state.fname;
    let lname = this.state.lname;
    let email = this.state.email;
    let password = this.state.password;
    let errors = {};
    let formIsValid = true;

    if (!fname) {
      formIsValid = false;
      errors.fname = '*Please enter your first name.';
    }

    if (typeof fname !== 'undefined') {
      if (!fname.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors.fname = '*Please enter alphabet characters only.';
      }
    }

    if (!lname) {
      formIsValid = false;
      errors.lname = '*Please enter your last name.';
    }

    if (typeof lname !== 'undefined') {
      if (!lname.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors.lname = '*Please enter alphabet characters only.';
      }
    }

    if (!email) {
      formIsValid = false;
      errors.email = '*Please enter your email-ID.';
    }

    if (typeof email !== 'undefined') {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );
      if (!pattern.test(email)) {
        formIsValid = false;
        errors.email = '*Please enter a valid email-ID.';
      }
    }
    var passPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/);
    if(!passPattern.test(password)){
      let pass = String(this.state.password);
      if (!pass.match(/^.*(?=.*\d).*$/)) {
        formIsValid = false;
        errors.password = '*Password Should contain number.';
      }
      if (!pass.match(/^.*(?=.*[a-z]).*$/)) {
        formIsValid = false;
        errors.password = '*Password Should contain lowercase.';
      }
      if (!pass.match(/^.*(?=.*[A-Z]).*$/)) {
        formIsValid = false;
        errors.password = '*Password Should contain uppercase.';
      }
      if (pass.length < 6) {
        formIsValid = false;
        errors.password = '*Password Should be atlease 6 character.';
      }
    }
    if (!password) {
      formIsValid = false;
      errors.password = '*Please enter your password.';
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  };



  render() {
    const deviceWidth = Math.round(Dimensions.get('window').width);
    return (
      <ImageBackground
        source={require('./images/login-bg.jpg')}
        style={{width: '100%', height: '100%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            {/* <Image
              style={styles.logTop}
              source={require('./images/logo.png')}
            /> */}
            <Text style = {{fontSize:30,color:'#fff'}}>SIGN UP</Text>
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('./images/user-icon.png')}
            />
            <Item style={styles.inputItem} floatingLabel>
              <Label style={styles.flotLab}>First Name</Label>
              <Input
                style={styles.inputs}
                onChangeText={fname => this.setState({fname})}
                keyboardType="default"
              />
            </Item>
          </View>

          <View>
            <Text style={styles.errorMsg}>{this.state.errors.fname}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('./images/user-icon.png')}
            />
            <Item style={styles.inputItem} floatingLabel>
              <Label style={styles.flotLab}>Last Name</Label>
              <Input
                style={styles.inputs}
                onChangeText={lname => this.setState({lname})}
                keyboardType="default"
              />
            </Item>
          </View>

          <View>
            <Text style={styles.errorMsg}>{this.state.errors.lname}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('./images/mail-icon.png')}
            />
            <Item style={styles.inputItem} floatingLabel>
              <Label style={styles.flotLab}>Email</Label>
              <Input
                style={styles.inputs}
                onChangeText={email => this.setState({email})}
                keyboardType="email-address"
              />
            </Item>
          </View>

          <View>
            <Text style={styles.errorMsg}>{this.state.errors.email}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('./images/password-icon.png')}
            />
            <Item style={styles.inputItem} floatingLabel>
              <Label style={styles.flotLab}>Password</Label>
              <Input
                style={styles.inputs}
                onChangeText={password => this.setState({password})}
                secureTextEntry={this.state.type}
                ref={input => (this.password = input)}
                keyboardType="default"
              />
              <Icon
                name={this.state.icon}
                onPress={() => this.changeIcon()}
                style={{color: 'white'}}
              />
            </Item>
          </View>

          <View style={styles.flotLab1}>
            <BarPasswordStrengthDisplay
              minLength={0}
              scoreLimit={100}
              levels={[
                {
                  label: 'Weak',
                  labelColor: '#ff6900',
                  activeBarColor: '#ff6900',
                },
                {
                  label: 'Fair',
                  labelColor: '#f2cf1f',
                  activeBarColor: '#f2cf1f',
                },
                {
                  label: 'Strong',
                  labelColor: '#14eb6e',
                  activeBarColor: '#14eb6e',
                },
              ]}
              width={deviceWidth - 80}
              password={this.state.password}
            />
          </View>

          <View>
            <Text style={styles.errorMsg}>{this.state.errors.password}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={this.signupForm}>
              <Text style={styles.signBtn}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialiconwrap}>
            <Text style={styles.dontText}> Already have an account?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={styles.signUpText}>Please Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: '-apple-system, BlinkMacSystemFont Segoe UI',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 60,
    marginTop:60,
  },
  logTop: {
    width: 300,
    height: 76,
    marginTop: 3
  },

  inputContainer: {
    borderBottomColor: '#fff',
    borderRadius: 0,
    borderBottomWidth: 1,
    width: '80%',
    height: 45,
    marginBottom: 20,
    marginLeft: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginRight: 0,
    borderBottomColor: '#000',
    marginLeft: 5,
    flex: 1,
    color: '#fff',
    fontSize: 13,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
    justifyContent: 'center',
  },
  socialIcon: {
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  signBtn: {
    width: 230,
    height: 60,
    color: '#fff',
    backgroundColor: '#ee4967',
    textAlign: 'center',
    lineHeight: 60,
    marginVertical: 10,
    borderRadius: 50,
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 60
  },
  socialiconwrap: {
    display: 'flex',
    flexDirection: 'row',
    color: '#fff',
    marginBottom: 20,
    marginLeft: 40
  },
  dontText: {
    color: '#fff',
    marginRight: 10,
  },
  signUpText: {
    color: '#ff4a67',
  },
  inputItem: {
    width: '90%',
  },
  flotLab: {lineHeight: 10, color: '#fff', fontSize: 13},
  flotLab1: {lineHeight: 10, color: '#fff', fontSize: 13, marginLeft: 25},
  errorMsg: {
    textAlign: 'left',
    color: '#ff4a67',
    marginLeft: 200,
  },
 
});

export default SignupScreen;

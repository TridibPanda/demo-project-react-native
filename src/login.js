/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    Image,
    TouchableOpacity,
    Button,
    AsyncStorage,
    Keyboard,
    ScrollView,
} from 'react-native';
import { Form, Item, Input, Icon, Label } from 'native-base';
//import axios from 'axios';
import base64 from 'base-64';
//import {API_URL} from './url';

class LoginScreen extends Component {
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

    loginForm = () => {
        let dataSet = this.validateForm();
        if (dataSet === true) {
            this.userLogin();
        }
    };

    validateForm = () => {
        let fields = this.state.fields;
        let field = this.state.field;
        let errors = {};
        let formIsValid = true;

        if (!fields) {
            formIsValid = false;
            errors.fields = '*Please enter your email-ID.';
        }
        if (typeof fields !== 'undefined') {
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
            );
            if (!pattern.test(fields)) {
                formIsValid = false;
                errors.fields = '*Please enter a valid email-ID.';
            }
        }
        if (!field) {
            formIsValid = false;
            errors.field = '*Please enter your password.';
        }

        this.setState({
            errors: errors,
        });
        return formIsValid;
    };

    //user login
    userLogin = () => {
        let obj = {
            username: base64.encode(this.state.fields),
            password: base64.encode(this.state.field),
        };
        console.log(obj);
        Keyboard.dismiss();
        //api integration
    };

    render() {
        return (

            <ImageBackground
                source={require('./images/login-bg.jpg')}
                style={{ width: '100%', height: '100%' }}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            {/* <Image
              style={styles.logTop}
              source={require('./images/logo.png')}
            /> */}
                            <Text style={{ fontSize: 30, color: '#fff' }}>SIGN IN</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image
                                style={styles.inputIcon}
                                source={require('./images/user-icon.png')}
                            />
                            <Item style={styles.inputItem} floatingLabel>
                                <Label style={styles.flotLab}>Email</Label>
                                <Input
                                    style={styles.inputs}
                                    onChangeText={username => {
                                        this.setState({ fields: username });
                                    }}
                                    keyboardType="email-address"
                                />
                            </Item>
                        </View>

                        <View>
                            <Text style={styles.errorMsg}>{this.state.errors.fields}</Text>
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
                                    onChangeText={password => {
                                        this.setState({ field: password });
                                    }}
                                    secureTextEntry={this.state.type}
                                    keyboardType="default"
                                />
                                <Icon
                                    name={this.state.icon}
                                    onPress={() => this.changeIcon()}
                                    style={{ color: 'white' }}
                                />
                            </Item>
                        </View>

                        <View>
                            <Text style={styles.errorMsg}>{this.state.errors.field}</Text>
                        </View>

                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                                <Text style={styles.fPassword}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity onPress={() => this.loginForm()}>
                                <Text style={styles.signBtn}>Sign In </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.socialiconwrap}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.socialIcon}
                                    source={require('./images/f-icon.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={styles.socialIcon}
                                    source={require('./images/gmail-icon.png')}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.socialiconwrap}>
                            <Text style={styles.dontText}> Dont have an account?</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('SignupScreen')}>
                                <Text style={styles.signUpText}>Sign UP </Text>
                            </TouchableOpacity>
                        </View>
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
        marginTop:100,
    },
    logTop: {
        width: 300,
        height: 76,
    },

    fPassword: {
        textAlign: 'right',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#ff4a67',
    },

    inputContainer: {
        borderBottomColor: '#fff',
        borderRadius: 0,
        borderBottomWidth: 1,
        width: '80%',
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputs: {
        height: 45,
        marginRight: 0,
        borderBottomColor: '#000',
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
    },
    socialiconwrap: {
        display: 'flex',
        flexDirection: 'row',
        color: '#fff',
        marginBottom: 20,
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
    flotLab: { lineHeight: 10, color: '#fff', fontSize: 13 },
    errorMsg: {
        textAlign: 'left',
        color: '#ff4a67',
        marginLeft: 200,
    },
});

export default LoginScreen;

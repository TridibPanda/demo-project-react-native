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
    AsyncStorage,
    Keyboard,
} from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
import OTPInputView from '@twotalltotems/react-native-otp-input';
// import base64 from 'base-64';
// import axios from 'axios';

class Otp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            otp: '',
            user_id: ''
        }
    }
    submitOTP() {
        this.props.navigation.navigate('SignupScreen');
        
    }
    resendOTP() {
        alert("❌ Error sending OTP");
    }

    render() {
        return (
            <ImageBackground
                source={require('./images/become-bg.jpg')}
                style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.conetntWrap}>
                        <Text style={styles.becomeHeader}>
                            An OTP sent to your email id
                        </Text>

                        <View style={styles.inputContainer}>
                            <OTPInputView
                                style={{ width: '100%', height: 200 }}
                                onCodeChanged={val => {
                                    this.setState({ otp: val })
                                }}
                                autoFocusOnLoad
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            />
                        </View>

                        <View style={styles.btnwrap}>
                            <TouchableOpacity  style={styles.signBtn} onPress={this.resendOTP.bind(this)}>
                                <Text style={{ color: '#000',fontSize: 14, }}>Resend</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.otpBtn} onPress={this.submitOTP.bind(this)}>
                                <Text style={{ color: '#fff', fontSize: 14,}} >Verify</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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

    inputContainer: {
        width: '100%',
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    signBtn: {
        width: 130,
        height: 40,
        backgroundColor: '#fff',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginTop: 20,
    },

    otpBtn: {
        width: 130,
        height: 40,
        backgroundColor: '#ff4a67',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginTop: 20,
    },

    btnwrap: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    inputItem: {
        width: '100%',
    },
    flotLab: { lineHeight: 10, color: '#fff', fontSize: 13 },
    conetntWrap: {
        borderColor: '#070707',
        borderWidth: 1,
        padding: 15,
        backgroundColor: 'rgba(25, 25, 25, 0.7)',
        borderRadius: 10,
    },
    becomeHeader: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    becomeCont: { padding: 20, marginTop: 30 },

    borderStyleBase: {
        height: 45,
    },

    borderStyleHighLighted: {
        borderColor: '#03DAC6',
    },

    underlineStyleBase: {
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: '#03DAC6',
    },
});

export default Otp;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getConfigs, fetchConfigs, updateConfigs } from 'd/configs';

import ContentHeader from 'c/ContentHeader';

import Switch from 'c/Switch';
import ToggleSwitch from 'c/ToggleSwitch';
import Input from 'c/Input';
import s0 from 'c/Config.module.scss';

const optionsRule = [
  {
    label: 'Global',
    value: 'Global'
  },
  {
    label: 'Rule',
    value: 'Rule'
  },
  {
    label: 'Direct',
    value: 'Direct'
  }
];

const optionsLogLevel = [
  {
    label: 'info',
    value: 'info'
  },
  {
    label: 'warning',
    value: 'warning'
  },
  {
    label: 'error',
    value: 'error'
  },
  {
    label: 'debug',
    value: 'debug'
  }
];

const actions = {
  fetchConfigs,
  updateConfigs
};

const mapStateToProps = s => {
  return {
    configs: getConfigs(s)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

class Config extends Component {
  static propTypes = {
    configs: PropTypes.object,
    fetchConfigs: PropTypes.func,
    updateConfigs: PropTypes.func
  };

  componentDidMount() {
    this.props.fetchConfigs();
  }

  handleInputOnChange = ev => {
    const { configs } = this.props;
    const target = ev.target;
    const { name } = target;

    let value;
    switch (target.type) {
      case 'checkbox':
        value = target.checked;
        break;
      case 'number':
        value = Number(target.value);
        break;
      default:
        value = target.value;
    }
    if (configs[name] === value) return;
    this.props.updateConfigs({ [name]: value });
  };

  render() {
    const { configs } = this.props;
    return (
      <div>
        <ContentHeader title="Config" />
        <div className={s0.root}>
          <div>
            <div className={s0.label}>HTTP Proxy Port</div>
            <Input
              name="port"
              value={configs.port}
              onChange={this.handleInputOnChange}
            />
          </div>

          <div>
            <div className={s0.label}>SOCKS5 Proxy Port</div>
            <Input
              name="socket-port"
              value={configs['socket-port']}
              onChange={this.handleInputOnChange}
            />
          </div>

          <div>
            <div className={s0.label}>Redir Port</div>
            <Input
              name="redir-port"
              value={configs['redir-port']}
              onChange={this.handleInputOnChange}
            />
          </div>

          <div>
            <div className={s0.label}>Allow LAN</div>
            <Switch
              name="allow-lan"
              checked={configs['allow-lan']}
              onChange={this.handleInputOnChange}
            />
          </div>

          <div>
            <div className={s0.label}>Mode</div>
            <ToggleSwitch
              options={optionsRule}
              name="mode"
              value={configs.mode}
              onChange={this.handleInputOnChange}
            />
          </div>

          <div>
            <div className={s0.label}>Log Level</div>
            <ToggleSwitch
              options={optionsLogLevel}
              name="log-level"
              value={configs['log-level']}
              onChange={this.handleInputOnChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);
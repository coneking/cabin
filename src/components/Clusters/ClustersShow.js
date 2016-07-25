/*
  Copyright 2015 Skippbox, Ltd

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import { PropTypes } from 'react';
import EntitiesList from 'components/EntitiesList';
import EntitiesRoutes from 'routes/EntitiesRoutes';
import PodsActions from 'actions/PodsActions';
import NodesActions from 'actions/NodesActions';
import ServicesActions from 'actions/ServicesActions';
import ReplicationsActions from 'actions/ReplicationsActions';
import DeploymentsActions from 'actions/DeploymentsActions';
import EntitiesActions from 'actions/EntitiesActions';
import AltContainer from 'alt-container';
import Colors from 'styles/Colors';
import SegmentedTabs from 'components/commons/SegmentedTabs';
import NamespacePicker from 'components/commons/NamespacePicker';
import EntitiesUtils from 'utils/EntitiesUtils';

const {
  View,
  Animated,
  StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    borderColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  clusterStatus: {
    width: 40, height: 40,
    backgroundColor: Colors.GREEN,
  },
});

export default class ClusterShow extends Component {

  static propTypes = {
    cluster: PropTypes.instanceOf(Immutable.Map).isRequired,
    entitiesToDisplay: PropTypes.instanceOf(Immutable.List).isRequired,
  }

  constructor() {
    super();
    this.state = {
      animatedIndex: new Animated.Value(0),
      activePage: 0,
    };
  }

  render() {
    const entitiesToDisplay = this.props.entitiesToDisplay.map(e => e.get('name'));
    const { cluster } = this.props;
    const active = entitiesToDisplay.get(this.state.activePage);
    return (
      <View style={styles.flex}>
        <View style={styles.header}>
          <NamespacePicker cluster={cluster}/>
          <SegmentedTabs
            isScrollable={true}
            selectedIndex={this.state.animatedIndex}
            controls={entitiesToDisplay.map(e => intl(e))}
            onPress={(i) => {
              Animated.timing(this.state.animatedIndex, {toValue: i, duration: 300}).start();
              this.setState({activePage: i});
            }}
          />
        </View>
        {active === 'pods' && <AltContainer stores={{
          entities: () => {
            return {
              store: alt.stores.PodsStore,
              value: alt.stores.PodsStore.getAll(cluster),
            };
          },
          status: () => {
            return {
              store: alt.stores.PodsStore,
              value: alt.stores.PodsStore.getStatus(cluster),
            };
          }}}>
          <EntitiesList
            navigator={this.props.navigator}
            listHeader={intl('pods')}
            status={alt.stores.PodsStore.getStatus(cluster)}
            entities={alt.stores.PodsStore.getAll(cluster)}
            onPress={pod => this.props.navigator.push(EntitiesRoutes.getPodsShowRoute({pod, cluster}))}
            onRefresh={() => PodsActions.fetchPods(cluster)}
            onDelete={pod => PodsActions.deletePod({cluster, pod})}
          />
        </AltContainer>}

        {active === 'services' && <AltContainer stores={{
          entities: () => {
            return {
              store: alt.stores.ServicesStore,
              value: alt.stores.ServicesStore.getAll(cluster),
            };
          },
          status: () => {
            return {
              store: alt.stores.ServicesStore,
              value: alt.stores.ServicesStore.getStatus(cluster),
            };
          }}}>
          <EntitiesList
            navigator={this.props.navigator}
            listHeader={intl('services')}
            status={alt.stores.ServicesStore.getStatus(cluster)}
            entities={alt.stores.ServicesStore.getAll(cluster)}
            onPress={(service) => this.props.navigator.push(EntitiesRoutes.getServicesShowRoute({service, cluster}))}
            onRefresh={() => ServicesActions.fetchServices(cluster)}
            onDelete={service => ServicesActions.deleteService({cluster, service})}
          />
        </AltContainer>}

        {active === 'replicationcontrollers' && <AltContainer stores={{
          entities: () => {
            return {
              store: alt.stores.ReplicationsStore,
              value: alt.stores.ReplicationsStore.getAll(cluster),
            };
          },
          status: () => {
            return {
              store: alt.stores.ReplicationsStore,
              value: alt.stores.ReplicationsStore.getStatus(cluster),
            };
          }}}>
          <EntitiesList
            navigator={this.props.navigator}
            listHeader={intl('replicationcontrollers')}
            status={alt.stores.ReplicationsStore.getStatus(cluster)}
            entities={alt.stores.ReplicationsStore.getAll(cluster)}
            onPress={(replication) => this.props.navigator.push(EntitiesRoutes.getReplicationsShowRoute({replication, cluster}))}
            onRefresh={() => ReplicationsActions.fetchReplications(cluster)}
            onDelete={replication => ReplicationsActions.deleteReplication({cluster, replication})}
          />
        </AltContainer>}

        {active === 'deployments' && <AltContainer stores={{
          entities: () => {
            return {
              store: alt.stores.DeploymentsStore,
              value: alt.stores.DeploymentsStore.getAll(cluster),
            };
          },
          status: () => {
            return {
              store: alt.stores.DeploymentsStore,
              value: alt.stores.DeploymentsStore.getStatus(cluster),
            };
          }}}>
          <EntitiesList
            navigator={this.props.navigator}
            listHeader={intl('deployments')}
            status={alt.stores.DeploymentsStore.getStatus(cluster)}
            entities={alt.stores.DeploymentsStore.getAll(cluster)}
            onPress={(deployment) => this.props.navigator.push(EntitiesRoutes.getDeploymentsShowRoute({deployment, cluster}))}
            onRefresh={() => DeploymentsActions.fetchDeployments(cluster)}
            onDelete={deployment => DeploymentsActions.deleteDeployment({cluster, deployment})}
          />
        </AltContainer>}

        {active === 'nodes' && <AltContainer stores={{
          entities: () => {
            return {
              store: alt.stores.NodesStore,
              value: alt.stores.NodesStore.getAll(cluster),
            };
          },
          status: () => {
            return {
              store: alt.stores.NodesStore,
              value: alt.stores.NodesStore.getStatus(cluster),
            };
          }}}>
          <EntitiesList
            navigator={this.props.navigator}
            listHeader={intl('nodes')}
            status={alt.stores.NodesStore.getStatus(cluster)}
            entities={alt.stores.NodesStore.getAll(cluster)}
            onPress={node => this.props.navigator.push(EntitiesRoutes.getNodesShowRoute({node, cluster}))}
            onRefresh={() => NodesActions.fetchNodes(cluster)}
            onDelete={node => NodesActions.deleteNode({cluster, node})}
          />
        </AltContainer>}
        {this.renderGeneralEntities(active)}
      </View>
    );
  }

  renderGeneralEntities(active) {
    const { cluster } = this.props;
    return ['secrets', 'serviceaccounts'].map(entityType => {
      if (active !== entityType) { return false; }
      const store = EntitiesUtils.storeForType(entityType);
      return (
        <AltContainer key={entityType} stores={{
          entities: () => {
            return {
              store,
              value: store.getAll(cluster),
            };
          },
          status: () => {
            return {
              store,
              value: store.getStatus(cluster),
            };
          }}}>
          <EntitiesList
            navigator={this.props.navigator}
            listHeader={intl(entityType)}
            status={store.getStatus(cluster)}
            entities={store.getAll(cluster)}
            onPress={entity => this.props.navigator.push(EntitiesRoutes.getEntitiesShowRoute({entity, cluster}))}
            onRefresh={() => EntitiesActions.fetchEntities({cluster, entityType})}
            onDelete={entity => EntitiesActions.deleteEntity({cluster, entity, entityType})}
          />
        </AltContainer>
      );
    });
  }

}

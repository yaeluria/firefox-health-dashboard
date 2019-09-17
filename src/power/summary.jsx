import React from 'react';
import PerfherderGraphContainer from '../utils/PerfherderGraphContainer';
import { URL } from '../vendor/requests';
import { COMBOS, PLATFORMS, TESTS } from './config';
import { selectFrom } from '../vendor/vectors';
import { DetailsIcon } from '../utils/icons';

class PowerSummary extends React.Component {
  render() {
    const { browser, suite, timeDomain } = this.props;
    const browserFilter = selectFrom(COMBOS)
      .where({ browser, suite })
      .first().filter;
    const testFilter = selectFrom(TESTS).where({ id: 'cpu' }).first().filter;

    return (
      <PerfherderGraphContainer
        timeDomain={timeDomain}
        key="power usage"
        urls={{
          title: 'show details',
          url: URL({
            path: '/power',
            query: { browser, suite },
          }),
          icon: DetailsIcon,
        }}
        title="Speedometer CPU power usage"
        series={selectFrom(PLATFORMS)
          .map(({ label, filter: platformFilter }) => ({
            label,
            filter: {
              and: [testFilter, platformFilter, browserFilter],
            },
          }))
          .toArray()}
        missingDataInterval={10}
      />
    );
  }
}

// eslint-disable-next-line import/prefer-default-export
export { PowerSummary };

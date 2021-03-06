import * as classNames from 'classnames';
import * as React from 'react';
import Skeleton, { SkeletonProps } from 'src/components/core/Skeleton';
import { makeStyles, Theme } from 'src/components/core/styles';

import Grid from 'src/components/Grid';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: 10
  },
  oneLine: {
    marginBottom: 0
  },
  hasEntityIcon: {
    position: 'relative',
    '& > div:nth-of-type(2)': {
      paddingLeft: 54
    }
  },
  columnTitle: {
    marginBottom: theme.spacing(1)
  },
  columnText: {
    marginTop: theme.spacing(1),
    marginBottom: 0
  },
  skeletonIconContainer: {
    position: 'absolute',
    top: -10
  },
  skeletonIcon: {
    width: 36,
    height: 36
  }
}));

interface Props {
  table?: boolean;
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  firstColWidth?: number;
  textHeight?: number;
  subtextHeight?: number;
  oneLine?: boolean;
  hasEntityIcon?: boolean;
  compact?: boolean;
}

export type combinedProps = SkeletonProps & Props;

const _Skeleton: React.FC<combinedProps> = props => {
  const classes = useStyles();
  const {
    table,
    columns,
    firstColWidth,
    variant,
    textHeight,
    subtextHeight,
    oneLine,
    hasEntityIcon,
    compact
  } = props;

  const cols: JSX.Element[] = [];
  const ifColumns = columns !== undefined ? columns : 1;
  const renderTableSkeleton = (colCount: number) => {
    const calcColumns = () => {
      if (colCount === 0) {
        return firstColWidth ? firstColWidth : 100 / ifColumns;
      } else {
        return firstColWidth
          ? (100 - firstColWidth) / (ifColumns - 1)
          : 100 / ifColumns;
      }
    };
    for (colCount = 0; colCount <= ifColumns - 1; colCount++) {
      cols.push(
        <Grid
          item
          style={{ flexBasis: `${calcColumns()}%` }}
          key={`ske-${colCount}`}
          data-testid={'skeletonCol'}
          className={compact ? 'py0' : undefined}
        >
          <Skeleton
            className={classes.columnTitle}
            height={textHeight && variant === 'text' ? textHeight : 16}
          />
          {!oneLine && (
            <Grid container>
              <Grid item xs={9} className="py0">
                <Skeleton
                  className={classes.columnText}
                  height={subtextHeight ? subtextHeight : 8}
                />
              </Grid>
              <Grid item xs={6} className="py0">
                <Skeleton
                  className={classes.columnText}
                  height={subtextHeight ? subtextHeight : 8}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      );
    }
    return;
  };

  return (
    <>
      {table ? (
        <>
          {renderTableSkeleton(ifColumns)}
          <Grid
            container
            className={classNames({
              [classes.root]: true,
              [classes.oneLine]: oneLine,
              [classes.hasEntityIcon]: hasEntityIcon
            })}
            data-testid={'tableSkeleton'}
            aria-label="Table Content Loading"
            tabIndex={0}
          >
            {hasEntityIcon && (
              <Grid item className={classes.skeletonIconContainer}>
                <Skeleton variant="circle" className={classes.skeletonIcon} />
              </Grid>
            )}
            {cols}
          </Grid>
        </>
      ) : (
        <Skeleton
          {...props}
          className={classes.root}
          data-testid={'basicSkeleton'}
          aria-label="Table Content Loading"
          tabIndex={0}
        />
      )}
    </>
  );
};

export default _Skeleton;

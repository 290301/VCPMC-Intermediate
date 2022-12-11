import style from './LinkActions.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import React from 'react';

const cx = classNames.bind(style);

export type LinkType = {
      type: 'Link';
      logo: any;
      to: string;
      title: string;
      className?: string;
};

export type ButtonType = {
      type: 'button';
      logo: any;
      title: string;
      className?: string;
      onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

type SingleAction = {
      type: 'single';
      actions: ButtonType | LinkType;
};
type MultiActions = {
      type: 'multi';
      actions: (ButtonType | LinkType)[];
};

export const CustomizeActionLink = (props: SingleAction | MultiActions) => {
      if (props.type === 'single') {
            if (props.actions.type === 'Link') {
                  return (
                        <Link to={props.actions.to} className={cx('wrapperSingleAction')}>
                              {props.actions.logo}
                              <p className={cx('titleActions')}>{props.actions.title}</p>
                        </Link>
                  );
            } else if (props.actions.type === 'button') {
                  return (
                        <button onClick={props.actions.onClick} type="button" className={cx('wrapperSingleAction')}>
                              {props.actions.logo}
                              <p className={cx('titleActions')}>{props.actions.title}</p>
                        </button>
                  );
            }
      }

      if (props.type === 'multi') {
            return (
                  <div className={cx('wrapperMultiAction')}>
                        {props.actions.map((action, index) =>
                              action.type === 'Link' ? (
                                    <Link key={index} to={action.to} className={cx('wrapper')}>
                                          {action.logo}
                                          <p className={cx('titleActions')}>{action.title}</p>
                                    </Link>
                              ) : (
                                    action.type === 'button' && (
                                          <button
                                                key={index}
                                                onClick={action.onClick}
                                                type="button"
                                                className={cx('wrapper')}
                                          >
                                                {action.logo}
                                                <p className={cx('titleActions')}>{action.title}</p>
                                          </button>
                                    )
                              ),
                        )}
                  </div>
            );
      }
      return <span>Errors</span>;
};

/*global define*/
'use strict';

define([], function () {

	function ConfirmationDialogController($scope, $stateParams, $modal, $modalInstance, text, cancelButton,isError){

			var self = this;

			self.text = text;
			self.cancelButton = cancelButton;
			self.isError = isError;

			self.ok = function () {
				$modalInstance.close('OK');
			};

			self.cancel = function () {
				$modalInstance.dismiss('Cancel');
			};

    }

	return {'ConfirmationDialogController': ['$scope', '$stateParams', '$modal', '$modalInstance', 'text', 'cancelButton', 'isError', ConfirmationDialogController]};
});
